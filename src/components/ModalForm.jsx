import React from "react";
import "../styles/components/modalForm.css";

const ModalForm = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-form">
        <div className="modal-content-form">
          <span className="closed" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalForm;
