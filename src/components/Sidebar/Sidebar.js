import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import NavbarLinks from "components/Navbars/NavbarLinks.js";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);


export default function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState([false, false, false, false, false]);

  function handleClick(index) {
    if (index == 0)
      return
    var openArr = open;
    openArr[index] = !openArr[index]
    setOpen(openArr);
  };

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, image, logoText, routes } = props;


  var brand = (
    <div className={classes.logo}>
      <b className={classNames(classes.logoLink, {
        [classes.logoLinkRTL]: true
      })}>{logoText}</b>

    </div>
  );


  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        var hasChildren = prop.children != undefined;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses} onClick={hasChildren ? () => handleClick(key) : null}>
              <prop.icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: true
                })}
              />
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: true
                })}
                disableTypog
                raphy={true}
              />
            </ListItem>
            {hasChildren ? <Collapse in={open[key]} timeout="auto" unmountOnExit>
              <List className={classes.nested}>
                {prop.children.map((child, childKey) => {
                  var activePro = " ";
                  var listItemClasses;
                  listItemClasses = classNames({
                    [" " + classes[color]]: activeRoute(child.layout + child.path)
                  });
                  const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(child.layout + child.path)
                  });
                  return (
                    <NavLink
                      to={child.layout + child.path}
                      className={activePro + classes.item}
                      activeClassName="active"
                      key={childKey}
                    >
                      <ListItem button className={classes.itemLink + listItemClasses}>
                        <child.icon
                          className={classNames(classes.itemIcon, whiteFontClasses, {
                            [classes.itemIconRTL]: true
                          })}
                        />
                        <ListItemText
                          primary={child.name}
                          className={classNames(classes.itemText, whiteFontClasses, {
                            [classes.itemTextRTL]: true
                          })}
                          disableTypography={true}
                        />
                      </ListItem>
                    </NavLink>
                  );
                })}
              </List>
            </Collapse> : null}
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <b className={classNames(classes.logoLink, {
        [classes.logoLinkRTL]: true
      })}>{logoText}</b>

    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: true
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {<NavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="right"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: true
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}



Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: true
};
