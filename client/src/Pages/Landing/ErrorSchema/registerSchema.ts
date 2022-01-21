import * as Yup from "yup";
import { loginSchema } from "./loginSchema";

export const registerSchema = {
  ...loginSchema,
  first_name: Yup.string().max(250, "Too Long!").required("Required!"),
  last_name: Yup.string().max(250, "Too Long!").required("Required!"),
  username: Yup.string().max(250, "Too Long!").required("Required!"),
  phone: Yup.string().max(250, "Too Long!").required("Required!"),
};
