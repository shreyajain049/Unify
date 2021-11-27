import { Button } from "@material-ui/core";
import React from "react";
import { useLocalContext } from "../../context/context";
import "./style.css";
const Login = () => {
  const { login, loggedInUser } = useLocalContext();

  console.log(loggedInUser);
  return (
    <div className="login__bg">
    <div className="login">
      <Button pill variant="outlined" color="inherit" size="large" onClick={() => login()}>
        Login !!
      </Button>
    </div>
    </div>
  );
};

export default Login;
