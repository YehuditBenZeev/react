import history from "./_history";
import './App.css';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Registration from "./layouts/Registration.js";
import Admin from "./layouts/Admin.js";
import React, { useContext } from "react";
import { UserContext } from "./userProvider";


function App() {
  // const user = null;
  const user = useContext(UserContext);

  return (
    user ? 
    <Router history={history}>
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin/dashboard" />
    </Router>
      :
      <Router history={history}>
        <Route path="/registration" component={Registration} />
        <Redirect from="/" to="/registration/login" />
      </Router>

  );
}

export default App;
