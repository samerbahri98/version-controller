import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  IAddPublicKeyFields,
  IAddPublicKeyPayload,
  IPublicKey,
} from "../../Interfaces/IPublicKey";
import { Field, Form, Formik } from "formik";
import { useAddPublicKey } from "../../Contexts/UserContexts";

const ADD_PUBLIC_KEY_MUTATION = gql`
  mutation ($public_key_hash: String!, $public_key_encryption_type: String!) {
    set_public_key(
      public_key_hash: $public_key_hash
      public_key_encryption_type: $public_key_encryption_type
    ) {
      public_key_id
      public_key_hash
      public_key_encryption_type
    }
  }
`;

function AddKey() {
  const [submitAddKey, { data, error, loading }] = useMutation<
    IAddPublicKeyPayload,
    IAddPublicKeyFields
  >(ADD_PUBLIC_KEY_MUTATION, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });
  const addPublicKey = useAddPublicKey()



  return (
    <Formik
      initialValues={{ public_key_hash: "", public_key_encryption_type: "" }}
      onSubmit={async (values: IAddPublicKeyFields) =>
        {submitAddKey({ variables: values })
      if(addPublicKey) addPublicKey({...values,public_key_id:""})
      }
      }
    >
      {(props) => (
        <Form>
          <div className="notification">
            <div className="field">
              <label className="label">Public Key Hash</label>
              <div className="control">
                <Field
                  component="textarea"
                  name="public_key_hash"
                  className="textarea is-link"
                  placeholder="Public Key Hash"
                  value={props.values.public_key_hash}
                />
                {/* </Field> */}
              </div>
            </div>
            <div className="field">
              <label className="label">Public Key Encryption type</label>
              <div className="control">
                <label className="radio">
                  <Field
                    type="radio"
                    name="public_key_encryption_type"
                    value="rsa"
                  />
                  rsa
                </label>
                <label className="radio">
                  <Field
                    type="radio"
                    name="public_key_encryption_type"
                    value="dsa"
                  />
                  dsa
                </label>
                <label className="radio">
                  <Field
                    type="radio"
                    name="public_key_encryption_type"
                    value="ecdsa"
                  />
                  ecdsa
                </label>
                <label className="radio">
                  <Field
                    type="radio"
                    name="public_key_encryption_type"
                    value="ed25519"
                  />
                  ed25519
                </label>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-link is-light"
                  onClick={() => (props.values.public_key_hash = "")}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddKey;
