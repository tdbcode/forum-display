import './App.css';
import React, { useEffect, useState } from 'react';
import * as AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './APIkey';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    var AWS = require('aws-sdk');

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

     ddb.query(params, (err, data) => {
      if (err) {
        console.error('Error querying database', err);
      } else {
        if (data.Items.length === 0){
          console.log('No matching user found');
        }
        else{
          const user = data.Items[0];
          console.log(data.Items[0]);
          if (user.password === password){
            console.log('Matching user', data.Items[0]);
            setLoginData(data.Items[0]);
          }
          else {
            console.log("Incorrect password");
          }
        }
      }
    });

    /*if (loginData && loginData.password === password) {
      console.log("logged in");
    } else {
      console.log("login error");
    }*/
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
        </form>
      </main>
    </div>
  );
}

export default App;