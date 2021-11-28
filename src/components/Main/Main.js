import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db from "../../lib/firebase";
import "./style.css";
import { useLocalContext } from "../../context/context";
import { Announcement } from "..";
const Main = ({ classData }) => {
  
  const { loggedInMail } = useLocalContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  let v="0";

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
  let curdate=dat+" "+mon+" "+year;
  let curtime=curtimestmp[4];
  let tme=curtimestmp[4];
  tme=tme.split(":");
  let time=tme[0]+tme[1]+tme[2];
  if(tme[0]<12)
    curtime+=" AM";
  else
  curtime+=" PM";
  var new_id=time+dat+mont+year;

const handlesize = (e) => {
      e.preventDefault();
      db.collection('Announcements')
      .doc("classes")
      .collection(classData.id)
      .get()
      .then(snap => {
        let size = snap.size;
        setVar(size,e);
  });
};
  const setVar = (size,e) => {
    let count=0;
    while(size>count) 
    {
      v=v+"0"
      count++;
    }
    v+=new_id;
    handleSend(e,v);
  };
  const handleSend = (e,v) => {
          e.preventDefault();
          db.collection("Announcements")
            .doc("classes")
            .collection(classData.id)
            .doc(v)
            .set({
              text: inputValue,
              sender: loggedInMail,
              sentOn: curdate,
              sentAt: curtime,
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
                          onClick={(e)=>handlesize(e)}
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
