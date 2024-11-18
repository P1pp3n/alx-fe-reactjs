import React from "react";
import { useFormik } from "formik";

const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      // Directly reference username, email, and password
      if (!values.username) errors.username = "Username is required";
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    },
    onSubmit: (values) => {
      // Simulate API call
      console.log("User  registered:", values);
      // Reset form
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formik.values.username} // Use Formik's state
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.username && (
          <span style={{ color: "red" }}>{formik.errors.username}</span>
        )}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formik.values.email} // Use Formik's state
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formik.values.password} // Use Formik's state
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.password && (
          <span style={{ color: "red" }}>{formik.errors.password}</span>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default FormikForm;
