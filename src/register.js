import React, { useState } from 'react';
import * as AWS from 'aws-sdk';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setregisterError] = useState('');

    const handleRegister = ((h) => {
        h.preventDefault(); //Prevent full refresh
        
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

        var ddb = new AWS.DynamoDB();  // Connect to Dynamo Database via AWS
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
    });

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
            onChange={(u) => setUsername(u.target.value)}
          />
          </div>
          <div>
          <input
            className="App-form-input"
            id="password"
            type="password" // Password input type
            placeholder="Password"
            value={password}
            onChange={(p) => setPassword(p.target.value)}
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

