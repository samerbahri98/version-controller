import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import FieldForm from "../../Components/Form/FieldForm";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import IRegisterFields from "../../Interfaces/Landing/IRegisterFields";
import { gql, useMutation } from "@apollo/client";
import { IAuth } from "../../Interfaces/IAuth";

const REGISTER_MUTATION = gql`
  mutation registerMutation(
    $first_name: String!
    $last_name: String!
    $username: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    register(
      first_name: $first_name
      last_name: $last_name
      username: $username
      email: $email
      password: $password
      phone: $phone
    ) {
      accessToken
      refreshToken
      user {
        first_name
        attribution_tag
      }
    }
  }
`;

interface IRegisterPayload {
  register: IAuth;
}

function Register(props: {
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const [submitRegister, {data}] = useMutation<
    IRegisterPayload,
    IRegisterFields
  >(REGISTER_MUTATION, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data && data.register && data.register.accessToken) {
      localStorage.setItem("accessToken", data.register.accessToken);
      window.location.reload();
    }
  });
  return (
    <Formik
      initialValues={{
        first_name: "amani",
        last_name: "brik",
        username: "amanibrik5",
        email: "amanibrik5@gmail.com",
        password: "Amani123!!!",
        phone: "123456789",
      }}
      onSubmit={async (values) => submitRegister({ variables: values })}
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
