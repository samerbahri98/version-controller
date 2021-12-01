import React from "react";
import AddKey from "./AddKey";
import Key from "./Key";

function SshSettings() {
  return (
    <div className="notification container">
      <AddKey />
      <Key />
      <Key />
    </div>
  );
}

export default SshSettings;
