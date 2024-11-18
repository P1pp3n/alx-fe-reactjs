import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const FormikForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("User  registered:", values);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div>
            <label>
              Username:
              <Field type="text" name="username" />
            </label>
            <ErrorMessage
              name="username"
              component="span"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label>
              Email:
              <Field type="email" name="email" />
            </label>
            <ErrorMessage
              name="email"
              component="span"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label>
              Password:
              <Field type="password" name="password" />
            </label>
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

export default FormikForm;
