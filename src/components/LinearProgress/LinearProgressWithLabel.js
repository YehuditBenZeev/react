import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { infoColor, } from "assets/jss/material-dashboard-react.js";


const StyledLinearProgress = withStyles({
  colorPrimary: {
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
