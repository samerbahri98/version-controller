import React from "react";

function AddKey() {
  return (
    <div className="notification">
      <div className="field">
        <label className="label">Public Key Hash</label>
        <div className="control">
          <textarea
            className="textarea is-link"
            placeholder="Primary textarea"
          ></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Public Key Encryption type</label>
        <div className="control">
          <label className="radio">
            <input type="radio" name="question" />
            rsa
          </label>
          <label className="radio">
            <input type="radio" name="question" />
            dsa
          </label>
          <label className="radio">
            <input type="radio" name="question" />
            ecdsa
          </label>
          <label className="radio">
            <input type="radio" name="question" />
            ed25519
          </label>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddKey;
