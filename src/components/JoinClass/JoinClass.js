import React, { useState } from "react";
import { Avatar, Button, Dialog, TextField } from "@material-ui/core";
import { useLocalContext } from "../../context/context";
import { Close } from "@material-ui/icons";
import "./style.css";
import db from "../../lib/firebase";

const JoinClass = () => {
  const formRef = React.useRef();
  const {
    joinClassDialog,
    setJoinClassDialog,
    loggedInUser,
  } = useLocalContext();

  const [classCode, setClassCode] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState();
  const [emailerror, setEmailError] = useState();
  const [joinedData, setJoinedData] = useState();
  const [classExists, setClassExists] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("CreatedClasses")
      .doc(email)
      .collection("classes")
      .doc(classCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setClassExists(true);
          if(email===loggedInUser.email)
          {
            setEmailError(true);
          }
          else
          {
            setJoinedData(doc.data());
            setError(false);
          }
        } else {
          setError(true);
          setClassExists(false);
          return;
        }
      });

    if (classExists === true) {
      db.collection("JoinedClasses")
        .doc(loggedInUser.email)
        .collection("classes")
        .doc(classCode)
        .set({
          joinedData,
        })
        .then(() => {
          setJoinClassDialog(false);
        });
    }
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={joinClassDialog}
        onClose={() => setJoinClassDialog(false)}
      >
        <form ref={formRef}>
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setJoinClassDialog(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">Join Class</div>
            </div>
            <Button
              className="joinClass__btn"
              variant="contained"
              color="primary"
              onClick={(e)=>{if(formRef.current.reportValidity())handleSubmit(e)}}
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <p className="joinClass__formText">
              You're currently signed in as {loggedInUser?.email}
            </p>
            <div className="joinClass__loginInfo">
              <div className="joinClass__classLeft">
                <Avatar src={loggedInUser?.photoURL} />
                <div className="joinClass__loginText">
                  <div className="joinClass__loginName">
                    {loggedInUser?.displayName}
                  </div>
                  <div className="joinClass__loginEmail">
                    {loggedInUser?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClass__formText"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField required
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
              />
              <TextField required
                id="outlined-basic"
                label="Owner's email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                error={emailerror}
                helperText={emailerror && "You are the owner of this class !!"}
              />
            </div>
          </div>
        </div>
        </form>
      </Dialog>
    </div>
  );
};
export default JoinClass;
