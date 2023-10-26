import React, { useState } from 'react';
import * as AWS from 'aws-sdk';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); //Prevent full refresh

    var ddb = new AWS.DynamoDB();  // Connect to Dynamo Database via AWS

    // Paramaters for login search, querying for the entered username and returning any records matching
    var params = {
      TableName: 'forum-users',
      KeyConditionExpression: 'username = :u',
      ExpressionAttributeValues: {
        ':u': {S: username},
      },
      ProjectionExpression: 'username, password, email',
    };

    // Source: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-query-scan.html
     ddb.query(params, (err, data) => {
      if (err) {  // if database query error inform user
        console.error('Error querying database', err);
        setLoginError('Database Error. Please try again later.')
      } else {
        // If no matches found, inform user
        if (data.Items.length === 0){
          setLoginError('No user found');
        }
        else{
          // Source: https://stackoverflow.com/questions/51460982/what-is-the-recommended-way-to-remove-data-type-descriptors-from-a-dynamodb-resp
          var marshalled = AWS.DynamoDB.Converter.unmarshall(data.Items[0]); // Uses Dynamo's library to format data to JS equivalent
          // console.log(data.Items); // for testing only
          // console.log(marshalled); // for testing only
          // check if user password matches entered password
          // TO DO make password management more secure
          if (marshalled.password === password){
            console.log('Matching user', username);
            localStorage.setItem("user", username);
            setLoginError('')
            window.location.href = '/Dashboard';
          }
          else {
            // If password doesn't match, inform user
            console.log("Incorrect password");
            setLoginError('Incorrect Password')
          }
        }
      }
    });
  };

  const handleRegister = ((e) => {
    window.location.href = '/Register';
  });

  return (
    <div className="App">
      <main className="App-main">
        <form className="App-form" onSubmit={handleLogin}>
          <input
            className="App-form-input"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(u) => setUsername(u.target.value)}
          />
          <input
            className="App-form-input"
            id="password"
            type="password" // Password input type
            placeholder="Password"
            value={password}
            onChange={(p) => setPassword(p.target.value)}
          />
          <input type="submit" className="App-form-button" value="Submit" />
          <input type="button" className="App-form-button" value="Register" onClick={handleRegister} />
          <div id="feedback">{loginError}</div>
        </form>
      </main>
    </div>
  );
}

export default Login;