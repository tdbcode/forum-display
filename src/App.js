import './App.css';
import React, { useEffect, useState } from 'react';
import * as AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './APIkey';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: 'us-east-2',
    });

    var ddb = new AWS.DynamoDB();

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
      if (err) {
        console.error('Error querying database', err);
        setLoginError('Database Error. Please try again later.')
      } else {
        if (data.Items.length === 0){
          setLoginError('No user found');
        }
        else{
          // Source: https://stackoverflow.com/questions/51460982/what-is-the-recommended-way-to-remove-data-type-descriptors-from-a-dynamodb-resp
          var marshalled = AWS.DynamoDB.Converter.unmarshall(data.Items[0]); // Uses Dynamo's library to format data to JS equivalent
          // console.log(data.Items); // for testing only
          // console.log(marshalled); // for testing only
          if (marshalled.password === password){
            console.log('Matching user', username);
            setLoginData(marshalled);
            setLoginError('')
          }
          else {
            console.log("Incorrect password");
            setLoginError('Incorrect Password')
          }
        }
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TDB Forum</h1>
      </header>
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
          <div id="feedback">{loginError}</div>
        </form>
      </main>
    </div>
  );
}

export default App;