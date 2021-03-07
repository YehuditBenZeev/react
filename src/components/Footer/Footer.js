import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          <span>
            יהודית בן זאב, שרה בורובסקי-גרנית, דסי קרקינובסקי, תמר כהן, 
            {" "}{1900 + new Date().getYear()}&copy; 
          </span>
        </p>
      </div>
    </footer>
  );
}
