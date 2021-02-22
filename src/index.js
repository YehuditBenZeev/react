import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Registration from "./layouts/Registration.js";
import firebaseService from "./firebase_services/firebaseService.js";
import "./assets/css/material-dashboard-react.css";
import RTL from "./layouts/rtl.js";
import UserProvider from 'userProvider.js'


ReactDOM.render(
  <RTL>
    <UserProvider>
      <App />
    </UserProvider>
  </RTL>,
  document.getElementById("root")
);


