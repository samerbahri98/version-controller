import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import {
  useAddRepoContext,
  useToggleAddRepoContext,
} from "../../Contexts/DashboardContexts";
import { gql, useMutation } from "@apollo/client";
import { IRepo } from "../../Interfaces/IRepo";
import FieldForm from "../Form/FieldForm";
import { useAppendRepoListContext } from "../../Contexts/UserContexts";

const ADD_REPO_MUTATION = gql`
  mutation ($repository_name: String!) {
    createRepository(repository_name: $repository_name) {
      repository_id
      repository_name
      download {
        ssh
        http
      }
      created_at
    }
  }
`;

interface IAddRepoPayload {
  createRepository: IRepo;
}
interface IAddRepoFields {
  repository_name: String;
}

function AddModal() {
  const toggleAddRepoContext = useToggleAddRepoContext();
  const appendRepoList = useAppendRepoListContext();
  const [pending, setPending] = useState<boolean>(false);
  const addModal = useAddRepoContext();
  const [submitAddRepo, { data, error, loading }] = useMutation<
    IAddRepoPayload,
    IAddRepoFields
  >(ADD_REPO_MUTATION, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });
  useEffect(() => {
    if (loading) setPending(true);
    if (pending && data && appendRepoList) {
      appendRepoList(data.createRepository);
      toggleAddRepoContext(false);
      setPending(false);
    }
    console.log({ data, error, loading ,pending});
  });

  return (
    <Formik
      initialValues={{ repository_name: "" }}
      onSubmit={async (values) => submitAddRepo({ variables: values })}
    >
      {(props) => (
        <Form>
          <Modal
            title={"Add a repository"}
            onCancel={() => toggleAddRepoContext(false)}
            isVisible={addModal}
            onSubmit={props.handleSubmit}
          >
            <FieldForm
              label="Repository Name"
              className="input"
              type="text"
              name="repository_name"
              placeholder="Repository Name"
              value={props.values.repository_name}
            />
          </Modal>
        </Form>
      )}
    </Formik>
  );
}

export default AddModal;
