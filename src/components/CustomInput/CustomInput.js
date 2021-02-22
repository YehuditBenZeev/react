import React from "react";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';
import { lightBlue, red } from '@material-ui/core/colors';
import {
  grayColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  whiteColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      light: infoColor[2],
      main: infoColor[2],
      dark: infoColor[2],
      contrastText: 'transparent',
    },
    error: red
  },
});


function CustomTextField(props) {
  let { value, errorMessage, className, type, name, label, validations, validationErrors, InputProps, variant, required } = props;
  if(value == undefined) value = '';

  function changeValue(event) {
    props.setValue(event.currentTarget.value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <TextField
          margin='normal'
          className={className}
          type={type}
          name={name}
          label={label}
          validations={{
            minLength: 4
          }}
          // validationErrors={validationErrors}
          InputProps={InputProps}
          variant={variant}
          {...required}
          onChange={changeValue}
          value={value}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
      </div>
    </ThemeProvider>
  );

}
export default React.memo(withFormsy(CustomTextField));



