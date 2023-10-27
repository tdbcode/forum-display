import React, { useState } from 'react';
import * as AWS from 'aws-sdk';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setregisterError] = useState('');
    const ddb = new AWS.DynamoDB();  // Connect to Dynamo Database via AWS

    const ddbcheck = async (parameters, type, find) => {
      var data;
      try{
        if (type === "query"){
              data = await ddb.query(parameters).promise();
          }
          else if (type === "scan"){
            data = await ddb.scan(parameters).promise();
          }
          // console.log(data); // for testing only
          if (find){
            return data.Items.length !== 0;
          } 
          else if(!find){
            return data;
          }
        } catch(err){
            console.error('Error querying database', err);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault(); //Prevent full refresh

        //Check if requested username or email already exists
        // Paramaters for username search, querying for the entered username and returning any records matching
        const paramsUsername = {
          TableName: 'forum-users',
          KeyConditionExpression: 'username = :u',
          ExpressionAttributeValues: {
            ':u': {S: username},
          },
          ProjectionExpression: 'username'
        };

      var userExists = await ddbcheck(paramsUsername, "query", true);
      
      const paramsEmail = {
        TableName: 'forum-users',
        FilterExpression: 'email = :e',
        ExpressionAttributeValues: {
          ':e': { S: email },
        },
        ProjectionExpression: 'email',
      };

      var emailExists = await ddbcheck(paramsEmail, "scan", true);

      // console.log('Username exists:', userExists); // for testing only
      // console.log('Email exists:', emailExists); // for testing only
      var canRegister;
      if(!userExists && !emailExists){
        canRegister = true;
        setregisterError('');
        registerUser();
      } else if (userExists) {
          setregisterError('Username already in use.');
      }
      else if (emailExists) {
          setregisterError('Email already in use.');
      }
    };

    const registerUser = () => {
      // Source: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html
      // How to marshall: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/Converter.html#input-property 
      var params = {
          TableName: "forum-users",
          Item: AWS.DynamoDB.Converter.marshall({
              username : username,
              email : email,
              password: password
          })
      };
      console.log(params);
                    
      // Add items to database
      ddb.putItem(params, function(err, data) {
          if (err){
              console.log(err, err.stack);
              setregisterError("Database Registration Error.")
          } 
          else{
              console.log(data);
          }
      });
    };

    return(
        <div className="App">
       <main className="App-main">
       <h2>Register New Account</h2>
        <form className="App-form" onSubmit={handleRegister}>
            <div>
        <input
            className="App-form-input"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div>
          <input
            className="App-form-input"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div>
          <input
            className="App-form-input"
            id="password"
            type="password" // Password input type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <input type="submit" className="App-form-button" value="Register"/>
          <div id="feedback">{registerError}</div>
        </form>
      </main>
    </div>
    );
}

export default Register;