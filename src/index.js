import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './login';
import reportWebVitals from './reportWebVitals';
import Auth from './auth';

ReactDOM.render(
  <Auth>
    <LoginPage />
  </Auth>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
