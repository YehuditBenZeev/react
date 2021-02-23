import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "../routes/routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

let ps;

// function mergeAllRoutes(){
//   let allRoutes = [];
//   routes.map(prop => {
//     allRoutes.push({...prop, propPath:""})
//     if(prop.children){
//       subRoutes.map(child => {
//         allRoutes.push({...child, propPath:prop.path})
//       })
//     }
//   })
//   return allRoutes;
// }

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

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"לימוד אנגלית"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        rtlActive={true}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel} dir="rtl">
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          rtlActive={true}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>

        <Footer />

      </div>
    </div>
  );
}
