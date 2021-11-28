import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: "1.38rem",
    color: "#5f6368",
    marginLeft: "5px",
    cursor: "pointer",
  },
  appBar: {
    backgroundColor: "#87ceeb",
    color: "black",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
  },
  header__wrapper__right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: "15px",
    color: "#5f6368",
    cursor: "pointer",
  },
}));
