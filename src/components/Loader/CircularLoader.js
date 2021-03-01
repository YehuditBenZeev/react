import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { LinearProgress } from '@material-ui/core';
import classNames from "classnames";
import PropTypes from "prop-types";

// import styles from "assets/jss/material-dashboard-react/components/cardStyle.js";

import styles from "assets/jss/material-dashboard-react/layouts/registerStyle.js";
// import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../userProvider";
// const useStyles = makeStyles(styles);
import { CircularProgress } from '@material-ui/core';

// const classes = useStyles();
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

// const StyledLinearProgress = withStyles({
//     colorPrimary: {
//       backgroundColor: "#FFF"
//     },
//     barColorPrimary: {
//       backgroundColor: "#007887"
//     }
//   })(LinearProgress);