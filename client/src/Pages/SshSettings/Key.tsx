import React from "react";
import { IPublicKeyRenderInfo } from "../../Interfaces/IPublicKeyRenderInfo";

function Key({ info }: IPublicKeyRenderInfo) {
  return (
    <div className="notification is-link is-light public-key-list-item">
      <button className="delete"></button>
      {info.public_key_hash}
    </div>
  );
}

export default Key;
