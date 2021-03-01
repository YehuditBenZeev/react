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
    height: '3vw',
    borderRadius: '25px'
  },
  barColorPrimary: {
    backgroundColor: infoColor[2],
    borderRadius: '25px'
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

function LinearProgressWithLabel(props) {
  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
    <Box display="flex" alignItems="center">    
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box width="100%" mr={1}>
        <StyledLinearProgress variant="determinate" {...props} />

        {/* <LinearProgress variant="determinate" {...props} /> */}
      </Box>

    </Box>
    </div>
    </ThemeProvider>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearWithValueLabel(props) {
  const classes = useStyles();
  const progress = props.value
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}