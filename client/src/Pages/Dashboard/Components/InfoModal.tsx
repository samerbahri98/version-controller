import React from "react";

function InfoModal() {
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {/* <!-- Content ... --> */}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default InfoModal;
