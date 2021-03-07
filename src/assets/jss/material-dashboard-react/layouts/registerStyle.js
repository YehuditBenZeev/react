import {
    transition,
    boxShadow,
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    whiteColor,
    grayColor,
    blackColor,
    hexToRgb
} from "assets/jss/material-dashboard-react.js";


const registerStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        // height: "100vh",
        direction: "rtl"
      },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "grid",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      },
      content:{
        position: 'absolute', left: '50%', top: '13%',
        transform: 'translate(-50%, 0%)'
      },
      registerWrapper: {
        direction: "rtl",
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        // width: "260px",
        zIndex: "4",
        overflowScrolling: "touch"
      },
      rtlWrapper:{
        direction: "rtl",
      },
      colors: {
        "&$cssFocused $notchedOutline": {
            borderColor: `${infoColor[0]} !important`
          }
      }
})

export default registerStyle