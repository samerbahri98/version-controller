import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FieldForm from "../../Components/Form/FieldForm";
import * as Yup from "yup";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ILoginFields from "../../Interfaces/Landing/ILoginFields";
import { useQuery, gql, ApolloConsumer } from "@apollo/client";
import { IAuth } from "../../Interfaces/IAuth";
import { ToastNotification } from "../../Components/ToastNotification";
import { loginSchema } from "./ErrorSchema/loginSchema";

const LOGIN_QUERY = gql`
  query loginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        first_name
        attribution_tag
      }
    }
  }
`;

interface ILoginPayload {
  login: IAuth;
}

function Login(props: {
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const { data, loading, error, refetch } = useQuery<
    ILoginPayload,
    ILoginFields
  >(LOGIN_QUERY, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data && data.login && data.login.accessToken) {
      localStorage.setItem("accessToken", data.login.accessToken);
      localStorage.setItem("refreshToken", data.login.refreshToken);

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
    <ApolloConsumer>
      {(client) => (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape(loginSchema)}
          onSubmit={async (values) => {
            await refetch(values);
          }}
        >
          {({ errors, values }) => (
            <Form>
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
              <div className="field">
                <button
                  className="button is-primary"
                  type="submit"
                  // onClick={handleSubmit}
                >
                  Login
                </button>
                <button className="button ml-4" onClick={props.toggle}>
                  Create Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </ApolloConsumer>
  );
}

export default Login;
