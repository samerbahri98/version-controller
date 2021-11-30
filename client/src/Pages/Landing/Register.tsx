import { Form, Formik } from "formik";
import React from "react";
import FieldForm from "../../Components/Form/FieldForm";

import {
  faCodeBranch,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import IRegisterFields from "../../Interfaces/Landing/IRegisterFields";

const submitLogin: ((values: IRegisterFields) => void | Promise<any>) &
  ((values: any, formikHelpers: any) => void | Promise<any>) = () => {};

function Register(props: {
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
      }}
      // children={undefined}
      onSubmit={submitLogin}
    >
      {({ values }) => (
        <Form>
          <FieldForm
            label="First Name"
            className="input"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={values.first_name}
          />

          <FieldForm
            label="Last Name"
            className="input"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={values.last_name}
          />
          <FieldForm
            label="Username"
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
          />

          <FieldForm
            label="Email"
            className="input"
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            icon={faEnvelope}
          />

          <FieldForm
            label="Password"
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            icon={faLock}
          />

          <FieldForm
            label="Phone"
            className="input"
            type="text"
            name="phone"
            placeholder="Phone"
            value={values.phone}
          />

          <div className="field">
            <button
              className="button is-primary"
              // onClick={handleSubmit}
            >
              Create Account
            </button>
            <button className="button ml-4" onClick={props.toggle}>
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
