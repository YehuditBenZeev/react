import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import routes from "../routes/registerRoute.js";
import styles from "assets/jss/material-dashboard-react/layouts/registerStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";



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

const useStyles = makeStyles(styles);

function Registration() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.registerWrapper}>
        <div className={classes.content}>
          {switchRoutes}
        </div>
      </div>
      <div
        className={classes.background}
        style={{ backgroundImage: "url(" + bgImage + ")" }}
      >
      </div>
    </div>

  );
}

export default Registration;