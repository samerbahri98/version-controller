import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutContext } from "../../Contexts/UserContexts";

function Logout() {
  const navigate = useNavigate();
  const logoutSquence = useLogoutContext();

  if (logoutSquence) logoutSquence();
  navigate("/");
  window.location.reload();

  return <></>;
}

export default Logout;
