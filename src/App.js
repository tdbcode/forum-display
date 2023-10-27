import './App.css';
import React, { useEffect, useState } from 'react';
import * as AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './APIkey';
import Login from './login';
import Dashboard from './Dashboard'
import Register from './register';
import { Route, Routes, useNavigate } from "react-router-dom";


function App() {
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
  const navigate = useNavigate();
  const [token, setToken] = useState(); // Source to try: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

  // Ensure local AWS config file has the latest key (currently from APIkey.js)
  // TODO: Find a secure way to store the key (maybe AWS)
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  });

  useEffect(() => {
    if ((!currentUser && window.location.pathname !== '/login') && window.location.pathname !== '/Register') {
      navigate('/login');
    }
  }, [currentUser]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TDB Forum</h1>
      </header>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// AWS API: https://medium.com/serverlessguru/serverless-api-with-reactjs-6fa297ac8a27