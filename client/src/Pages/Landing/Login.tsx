import { Form, Formik } from "formik";
import React, { useState } from "react";
import FieldForm from "../../Components/Form/FieldForm";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ILoginFields from "../../Interfaces/Landing/ILoginFields";
import { useQuery, gql, ApolloConsumer } from "@apollo/client";
import { IAuth } from "../../Interfaces/IAuth";

const LOGIN_QUERY = gql`
  query {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

function Login(props: {
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  // const useLogin: ((values: ILoginFields) => void | Promise<any>) &
  //   ((values: ILoginFields, formikHelpers: any) => void | Promise<any>) = (
  //   values: ILoginFields
  // ) => {

  //   console.log({ loading, error, data });
  // };

  const { loading, error, data, refetch } = useQuery<IAuth, ILoginFields>(
    LOGIN_QUERY
    // ,
    // {
    //   variables: {
    //     email: emailState,
    //     password: passwordState,
    //   },
    // }
  );
  return (
    <ApolloConsumer>
      {(client) => (
        <Formik
          initialValues={{ email: "", password: "" }}
          // children={undefined}
          onSubmit={(values) =>
            refetch(values).then((auth) => console.log(auth.data.accessToken))
          }
        >
          {({ values }) => (
            <Form>
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
              {/* <div className="field">
                <label htmlFor="" className="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div> */}
              <div className="field">
                <button
                  className="button is-primary"
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
