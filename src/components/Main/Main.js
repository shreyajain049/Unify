import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db from "../../lib/firebase";
import "./style.css";
import firebase from "firebase";
import { useLocalContext } from "../../context/context";
import { Announcement } from "..";
const Main = ({ classData }) => {
  
  const { loggedInMail } = useLocalContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");

  const[varzero,setVarzero]=useState("0");
  
  const months = new Map();
  months.set('Jan','01');
  months.set('Feb','02'); 
  months.set('Mar','03'); 
  months.set('Apr','04'); 
  months.set('May','05');
  months.set('Jun','06');
  months.set('Jul','07'); 
  months.set('Aug','08'); 
  months.set('Sep','09'); 
  months.set('Oct','10');
  months.set('Nov','11');
  months.set('Dec','12');
  
  
  var curtimestmp=Date();
  curtimestmp=curtimestmp.split(" ");
  let mon=curtimestmp[1];
  let mont=months.get(mon);
  let dat=curtimestmp[2];
  let year=curtimestmp[3];
  let tme=curtimestmp[4];
  tme=tme.split(":");
  let time=tme[0]+tme[1]+tme[2];
  var new_id=time+dat+mont+year;


  /*
  function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  new_id=padLeadingZeros(new_id, new_id.length+3);
*/
  const setVar = () => {
    let v=varzero+"0"
    setVarzero(v);
  };
  const handleSend = (e) => {
      e.preventDefault();
          db.collection("Announcements")
            .doc("classes")
            .collection(classData.id)
            .doc(varzero+new_id)
            .set({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              text: inputValue,
              sender: loggedInMail,
            })
            
            .then(() => {
              setInput("");
              setShowInput(false);
            });
  };
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.className}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <div>
                        <Button
                          disabled={!inputValue}
                          onClick={(e)=>{handleSend(e);setVar()}}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                        <Button color="secondary" onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
            <Announcement classData={classData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
