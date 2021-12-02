import React from "react";
import { usePublicKeysList } from "../../Contexts/UserContexts";
import AddKey from "./AddKey";
import Key from "./Key";

function SshSettings() {
  const publicKeysList = usePublicKeysList();
  return (
    <div className="notification container">
      <AddKey />
      {publicKeysList.map((item) => (
        <Key key={item.public_key_id} info={item}/>
      ))}
    </div>
  );
}

export default SshSettings;
