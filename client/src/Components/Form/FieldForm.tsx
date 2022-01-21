import React from "react";
import { Field } from "formik";
import IFIeldFormProps from "../../Interfaces/Form/IFieldFormProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const FieldForm = (props: IFIeldFormProps) => {
  return (
    <div className="field">
      <label className="label" style={{ textAlign: "left" }}>
        {props.label}
      </label>
      <div className="control has-icons-left has-icons-right">
        <Field
          className={`${props.className} ${
            props.error
              ? "is-danger"
              : props.isValidatable
              ? props.value !== ""
                ? "is-success"
                : ""
              : ""
          }`}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          as={props.as}
          value={props.value}
          step="1"
          min="4"
          max="100"
        />
        {props.icon ? (
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={props.icon} />
          </span>
        ) : (
          <React.Fragment />
        )}
        {props.error ? (
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>
        ) : props.isValidatable ? (
          props.value !== "" ? (
            <span className="icon is-small is-right">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : (
            <React.Fragment />
          )
        ) : (
          <React.Fragment />
        )}
      </div>
      {props.error ? (
        <p className="help is-danger">{props.error}</p>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default FieldForm;
