import './App.css';
import React, {useEffect, useState} from 'react';
import AWS from 'aws-sdk';

function App(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const accessDocClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: 'forum-users',
      KeyConditionExpression: '#un = :user',
      ExpressionAttributeNames: {
        '#un': 'username',
      },
      ExmpressionAttributeValues: {
        ':user': username,
      },
      };

      accessDocClient.query(params, (err,data) => {
        if (err){
          console.error('Error querying database', err);
        } else{
          setLoginData(data.Items.length > 0 ? data.ITems[0] : null);
        }
      });

    }, [username]);
   
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  });

  const handleLogin = (e) =>{
    e.preventDefault();
    if ((loginData) && (loginData.password === password)){
      console.log("logged in");
    }
    else{
      console.log("login error")
    }
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