import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./layouts/Admin.js";
import Registration from "./layouts/Registration.js";
import firebaseService from "./firebase_services/firebaseService.js";
import "./assets/css/material-dashboard-react.css";

const hist = createBrowserHistory();

firebaseService.init(
  success => {
      if ( !success )
      {
          return;
      }
  }
);
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/registration" component={Registration} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
