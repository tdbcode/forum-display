import './App.css';
import React, {useState} from 'react';
import { API } from "aws-amplify";
import { createLogin } from '.graphq1/mutations';

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) =>{
    e.preventDefault();
    if ((username == "test") && (password =="test")){
      console.log("logged in");
    }
    else{
      console.log("login error")
    }
  }


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
