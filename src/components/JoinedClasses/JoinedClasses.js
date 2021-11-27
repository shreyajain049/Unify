import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const JoinedClasses = ({ classData }) => {
  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__image" />
          <div className="joined__content">
            <Link className="joined__title" to={`/${classData.id}`}>
              <h2>{classData.className}</h2>
            </Link>
            <p className="joined__details">{classData.section}</p>
            <p className="joined__details">{classData.owner}</p>
          </div>
        </div>
        <Avatar
          className="joined__avatar"
          src="avatar.png"
        />
      </div>
        <div>
          <p className="joined__desc">{classData.coursedesc}</p>
        </div>
    </li>
  );
};

export default JoinedClasses;
