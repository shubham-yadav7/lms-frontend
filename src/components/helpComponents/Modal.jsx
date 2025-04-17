import React from "react";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({ children, show, onHide, small, xsm }) => {
  return (
    <div className={`custom-modal-wrap ${show ? "showModal" : ""}`}>
      <div className="container">
        <div
          className={`custom-modal ${small ? "small-modal" : ""} ${
            xsm ? "extra-small-modal" : ""
          }`}
        >
          {children}
          <span onClick={onHide} className="modal-close">
            <MdOutlineClose />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
