import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import FieldForm from "../../Components/Form/FieldForm";
import * as Yup from "yup";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import IRegisterFields from "../../Interfaces/Landing/IRegisterFields";
import { gql, useMutation } from "@apollo/client";
import { IAuth } from "../../Interfaces/IAuth";
import { ToastNotification } from "../../Components/ToastNotification";
import { registerSchema } from "./ErrorSchema/registerSchema";

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
  const [submitRegister, { data, error }] = useMutation<
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
    } else {
      error?.graphQLErrors.forEach((e) =>
        ToastNotification({
          type: "error",
          message: e.message,
        })
      );
    }
  });
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
      validationSchema={Yup.object().shape(registerSchema)}
      onSubmit={async (values) => submitRegister({ variables: values })}
    >
      {({ errors, values }) => (
        <Form>
          <FieldForm
            label="First Name"
            className="input"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={values.first_name}
            error={errors.first_name}
            isValidatable={true}
          />

          <FieldForm
            label="Last Name"
            className="input"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={values.last_name}
            error={errors.last_name}
            isValidatable={true}
          />
          <FieldForm
            label="Username"
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            error={errors.username}
            isValidatable={true}
          />

          <FieldForm
            label="Email"
            className="input"
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            icon={faEnvelope}
            error={errors.email}
            isValidatable={true}
          />

          <FieldForm
            label="Password"
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            icon={faLock}
            error={errors.password}
            isValidatable={true}
          />

          <FieldForm
            label="Phone"
            className="input"
            type="text"
            name="phone"
            placeholder="Phone"
            value={values.phone}
            error={errors.phone}
            isValidatable={true}
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
