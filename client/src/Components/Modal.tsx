import React from "react";
import { IModalProps } from "../Interfaces/IModalProps";

function Modal({
  onCancel,
  onSubmit,
  submitButtonText,
  title,
  children,
  isVisible,
}: IModalProps) {
  return (
    <div className={isVisible ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancel}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          {onSubmit ? (
            <button className="button is-primary" onClick={onSubmit}>
              {submitButtonText ? submitButtonText : "Save changes"}
            </button>
          ) : (
            <></>
          )}

          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
