import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  infoColor,
} from "assets/jss/material-dashboard-react.js";

const StyledLinearProgress = withStyles({
  colorPrimary: {
    // backgroundColor: "white",
    // height: '3vw',
    // borderRadius: '25px'
  },
  barColorPrimary: {
    backgroundColor: infoColor[2],
  },
})(LinearProgress);

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      light: "white",
      main: infoColor[2],
      dark: infoColor[2],
      contrastText: 'transparent',
    },
  },
});

function LinearWithValueLabel(props) {
  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <LinearProgress />
    </div>
    </ThemeProvider>
  );
}

export default LinearWithValueLabel;

// LinearProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate and buffer variants.
//    * Value between 0 and 100.
//    */
//   value: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
// });

// export default function LinearWithValueLabel(props) {
//   const classes = useStyles();
//   const progress = props.value


//   return (
//     <div className={classes.root}>
//       <<LinearProgress />
//     </div>
//   );
// }