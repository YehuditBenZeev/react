import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/typographyStyle.js";


const useStyles = makeStyles(styles);

export default function Info(props) {
  const classes = useStyles();
  const { children, fontSize } = props;
  return (
    <div className={classes.infoText} style = {{fontSize: fontSize ?? fontSize}}>
      {children}
    </div>
  );
}

Info.propTypes = {
  children: PropTypes.node
};
