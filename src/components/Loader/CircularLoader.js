import React from 'react';
import styles from "assets/jss/material-dashboard-react/layouts/registerStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles(styles);

export default function CircularLoader(props) {
  const classes = useStyles();
    return (
      <div className={classes.registerWrapper}>
        <div className={classes.content}>
            <CircularProgress style={{'color': '#33bccd', 'width': "15vh", "height": "15vh"}}/>
        </div>
      </div>
    );
}

