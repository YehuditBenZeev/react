import history from "./_history";
import { Router, Route, Redirect } from "react-router-dom";
import Registration from "./layouts/Registration.js";
import Admin from "./layouts/Admin.js";
import React, { useContext } from "react";
import { UserContext } from "./userProvider";
import styles from "assets/jss/material-dashboard-react/layouts/registerStyle.js";
import bgImage from "assets/img/register.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(styles);

function App() {
  const user = useContext(UserContext);
  const classes = useStyles();

  if (user == null)
    return (
      <div>
        <div className={classes.registerWrapper}>
          <div className={classes.content}>
            <CircularProgress style={{ 'color': '#33bccd', 'width': "15vh", "height": "15vh" }} />
          </div>
        </div>
        <div
          className={classes.background}
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        >
        </div>
      </div>
    );
  else
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
