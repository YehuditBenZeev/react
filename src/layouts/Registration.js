import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import routes from "registerRoute.js";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";




const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
  
      })}
    </Switch>
  );


function Registration(){
    // const classes = useStyles();

    return (
switchRoutes
    );
}

export default Registration;