import React from "react";

const Announcement = ({ dismissAlert, announcement }) => {
  return (
    <div className="quick-alert">
      <div className="container">
        <p className="font-poppins">{announcement.announcement}</p>
      </div>
      <div className="alert-cancel-btn" onClick={dismissAlert}>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Announcement;
