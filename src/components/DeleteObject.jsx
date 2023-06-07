import React from "react";
import "../styles/components/deleteObject.css";
const DeleteObject = ({ handleDelete, object, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const handleConfirmation = () => {
    handleDelete(object.id);
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <div className="container-delete">
        <div className="container-titulo-delete">
          <p className="titulo-delete">
            ¿ESTAS SEGURO QUE QUIERES ELIMINAR ESTO?
          </p>
          <div className="container-delete-buttons">
            <button className="si" onClick={handleConfirmation}>
              SI
            </button>
            <button className="no" onClick={handleCancel}>
              NO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteObject;
