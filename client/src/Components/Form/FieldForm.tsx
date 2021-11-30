import React from "react";
import { Field } from "formik";
import IFIeldFormProps from "../../Interfaces/Form/IFieldFormProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FieldForm = (props: IFIeldFormProps) => {
  return (
    <div className="field">
      <label className="label" style={{ textAlign: "left" }}>
        {props.label}
      </label>
      <div className="control has-icons-left">
        <Field
          className={props.className}
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
      </div>
    </div>
  );
};

export default FieldForm;
