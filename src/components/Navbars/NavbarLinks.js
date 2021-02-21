import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Dashboard from "@material-ui/icons/Dashboard";
import Button from "components/CustomButtons/Button.js";
import Admin from 'layouts/Admin';
import history from '_history';
import firebaseService from '../../firebase_services/firebaseService'
import styles from "assets/jss/material-dashboard-react/components/rtlHeaderLinksStyle.js";

const useStyles = makeStyles(styles);

export default function NavbarLinks() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const handleToggle = event => {
    if (open && open.contains(event.target)) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogOut = () => {
    history.push({
			pathname: '/'
		});
    firebaseService.signOut();
  }

  return (
    <div>
      <Button
        color="transparent"
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
        component={Link}
        to="/admin/dashboard"
        onClick={handleClose}
      >

        <Dashboard className={classes.icons} />
      </Button>
      <div className={classes.manager}>
        <Button
          color="transparent"
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Person className={classes.icons} />
        </Button>
        <Poppers
          open={Boolean(open)}
          anchorEl={open}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role="menu">
                    <MenuItem 
                      component={Link}
                      to="/"
                      onClick={handleLogOut}
                      className={classes.dropdownItem}
                    >
                      יציאה
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
