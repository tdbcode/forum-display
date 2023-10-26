import './App.css';
import React, { useEffect, useState } from 'react';
import * as AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './APIkey';
import Login from './login';
import Dashboard from './Dashboard'
import Register from './register';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  // Ensure local AWS config file has the latest key (currently from APIkey.js)
  // TODO: Find a secure way to store the key (maybe AWS)
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  });

  useEffect(() => {
    if ((!currentUser && window.location.pathname !== '/login') && window.location.pathname !== '/Register') {
      window.location.href = '/login';
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    console.log(localStorage.getItem("user"));
    setCurrentUser("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TDB Forum</h1>
      </header>
      <main className="App-main">
      {isLoggedIn ? (
          <>
        <form className="App-form">
          {currentUser}
          <input type="button" value="Log Out" onClick={handleLogout} />
        </form>
        </>
        ): null}
        <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;