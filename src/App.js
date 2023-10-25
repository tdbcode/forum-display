import './App.css';
import React, {useState} from 'react';
import AWS from 'aws-sdk';

function App(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   
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

  return (
    <div className="App">
      <header>
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
            type="text"
            placeholder="Password"
            value={password}
            onChange={(p) => setPassword(p.target.value)}
          />
          <input type="submit" className="App-form-button" value="Submit" />
        </form>
      </main>
    </div>

  );
};

export default App;