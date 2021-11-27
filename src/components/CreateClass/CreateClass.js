import {
  Button,
  Dialog,
  DialogActions,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import "./style.css";
import { v4 as uuidV4 } from "uuid";
import db from "../../lib/firebase";


const CreateClass = () => {
      
  const {createClassDialog, setCreateClassDialog ,loggedInMail} = useLocalContext();
  
  const [className, setClassName] = useState("");
  const [Section, setSection] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [Subject, setSubject] = useState("");
  const [CourseDescription,setCourseDescription] = useState("");
 

  const addClass = (e) => {
    e.preventDefault();
    const id = uuidV4();

    db.collection("CreatedClasses")
      .doc(loggedInMail)
      .collection("classes")
      .doc(id)
      .set({
        owner: loggedInMail,
        className: className,
        section: Section,
        subject: Subject,
        subjectCode: SubjectCode,
        coursedesc: CourseDescription,
        id: id,
      })
      .then(() => {
        setCreateClassDialog(false);
      });
  };
  return (
    <div className="form">
     <Dialog
        onClose={() => setCreateClassDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={createClassDialog}
        maxWidth="lg"
        className="form__dialog"
      >
      <p className="class__title">Create Class</p>
      <div className="form__inputs">
        <TextField required
          id="filled-basic"
          label="Class Name (required)"
          className="form__input"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Section"
          className="form__input"
          variant="filled"
          value={Section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Subject"
          className="form__input"
          variant="filled"
          value={Subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="SubjectCode"
          className="form__input"
          variant="filled"
          value={SubjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Course Description"
          className="form__input"
          variant="filled"
          value={CourseDescription}
          multiline rows={2}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={addClass} color="primary">
          Create
        </Button>
      </DialogActions>
      </Dialog>
    </div>
  
    );
  
};

export default CreateClass;
