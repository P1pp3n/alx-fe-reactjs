import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Simulate API call
    console.log("User  registered:", values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" />
            <ErrorMessage
              name="username"
              component="span"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="span"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="span"
              style={{ color: "red" }}
            />
          </div>
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
