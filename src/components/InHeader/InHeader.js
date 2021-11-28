import {
  AppBar,
  Avatar,
  Toolbar,
  Tooltip,
  Link
} from "@material-ui/core";
import React from "react";
import { useLocalContext } from "../../context/context";
import { useStyles } from "./style";

const InHeader = () => {
  const classes = useStyles();

  const {
    loggedInUser
  } = useLocalContext();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            <img
              src="logo.png"
              alt="Unify"
              width="90px"
            />
            <Tooltip  disableFocusListener disableTouchListener title="View all classes">
              <Link href="/"  variant="h6" className={classes.title} underline="none">
                Unify
              </Link>
            </Tooltip>
          </div>
          <div className={classes.header__wrapper__right}>
            <div>
              <Tooltip  disableFocusListener disableTouchListener title={loggedInUser?.email}>
              <Avatar
                src={loggedInUser?.photoURL}
                className={classes.icon}
              />
              </Tooltip>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default InHeader;
