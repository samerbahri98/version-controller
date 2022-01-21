import { Field, Form, Formik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { ITicketFields, ITicketPayload } from "../../Interfaces/ITicket";
import { useEffect } from "react";
import { ToastNotification } from "../../Components/ToastNotification";

const SUBMIT_TICKET_MUTATION = gql`
  mutation ($Message: String!, $Subject: String!) {
    create_ticket(Message: $Message, Subject: $Subject) {
      Subject
      Status
    }
  }
`;

function Help() {
  const [submitTicket, { data, error, loading }] = useMutation<
    ITicketPayload,
    ITicketFields
  >(SUBMIT_TICKET_MUTATION, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });
  const navigate = useNavigate();

  const handleSubmit = async (values: ITicketFields) => {
    submitTicket({ variables: values });
    if (error)
      ToastNotification({
        type: "error",
        message: "And error had occured!",
      });
    else {
      ToastNotification({
        type: "success",
        message: "Ticket submitted successfully",
      });
      navigate("/");
    }
  };

  return (
    <Formik
      initialValues={{
        Subject: "",
        Message: "",
      }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <div className="notification container">
            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <Field
                  type="text"
                  name="Subject"
                  className="input is-link"
                  placeholder="Subject"
                  value={props.values.Subject}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <Field
                  component="textarea"
                  name="Message"
                  className="textarea is-link"
                  placeholder="Message"
                  value={props.values.Message}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Help;
