import * as Yup from "yup";

export const loginSchema = {
  email: Yup.string()
    .email("Invalid email!")
    .required("Required!")
    .min(6, "Too Short!")
    .max(250, "Too Long!"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(250, "Too Long!")
    .required("Required!")
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Too Weak!"
    ),
};
