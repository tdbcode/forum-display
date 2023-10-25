import './App.css';
import React, {useEffect, useState} from 'react';
import AWS from 'aws-sdk';

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const AWS = require('aws-sdk');

  AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'us-east-2', // Replace with your desired AWS region
  });

  const handleLogin = (e) =>{
    e.preventDefault();
    if ((username === "test") && (password === "test")){
      console.log("logged in");
    }
    else{
      console.log("login error")
    }
  };

  const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'YourTableName',
  Item: {
    ID: 1,
    Name: 'John Doe',
    Email: 'johndoe@example.com',
  },
};

docClient.put(params, (err, data) => {
  if (err) {
    console.error('Error adding item to DynamoDB:', err);
  } else {
    console.log('Item added successfully:', data);
  }
});


  return (
    <div className="App">
      <header className="App-header">
        <h1>TDB Forum</h1>
      </header>
      <div className="App-main">
        <p>Please Login!</p>

        <form className="App-login-form" onSubmit={handleLogin}>
          <div><label htmlFor="username" className="App-login-form-label">Username: </label>
            <input type="text" id="username" className="App-login-form-input" onChange={((u) => setUsername(u.target.value))}/>
          </div>
          <div>
            <label htmlFor="password" className="App-login-form-label">Password: </label>
            <input type="text" id="password" className="App-login-form-input" onChange={((p) => setPassword(p.target.value))}/>
          </div>
          <input type="submit" value="Submit"/>

        </form>
      </div>
    </div>  
  );
}

export default App;
