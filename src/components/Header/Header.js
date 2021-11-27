import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { CreateClass, JoinClass } from "..";
import { useLocalContext } from "../../context/context";
import { useStyles } from "./style";

const Header = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const {
    setCreateClassDialog,
    setJoinClassDialog,
    loggedInUser,
    logout,
  } = useLocalContext();

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };
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
            <Typography variant="h6" className={classes.title}>
              Unify
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Avatar
                src={loggedInUser?.photoURL}
                className={classes.icon}
              />
            </div>
            <div>
                <Button variant="primary" onClick={() => logout()}>Logout</Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />
    </div>
  );
};

export default Header;
