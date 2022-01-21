import React, { useState } from "react";
import { ToastContainer, toast, ToastTransition, Slide } from "react-toastify";
import { IToast } from "../Interfaces/IToast";

export const ToastNotification = (props: IToast) => {
  switch (props.type) {
    case "success":
      toast.success(props.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      break;
    case "warn":
      toast.warn(props.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      break;
    case "info":
      toast.info(props.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(props.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      break;
  }
};

const NotificationComponent = (props: IToast) => {
  return (
    <div className={mapTypeToClassName.get(props.type)}>
      <button
        className="delete Toastify__close-button"
        onClick={props.closeToast}
      ></button>
      {props.message}
    </div>
  );
};

const mapTypeToClassName = new Map<string, string>();
mapTypeToClassName.set("success", "notification is-success");
mapTypeToClassName.set("info", "notification is-info");
mapTypeToClassName.set("warn", "notification is-warning");
mapTypeToClassName.set("error", "notification is-danger");

// const mapTypeToComponent = new Map<string,React.Component>()
