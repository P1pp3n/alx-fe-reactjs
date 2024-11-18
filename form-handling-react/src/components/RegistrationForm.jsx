import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    // Destructure formData for easier access
    const { username, email, password } = formData;

    // Directly reference username, email, and password
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Simulate API call
      console.log("User  registered:", formData);
      // Reset form
      setFormData({ username: "", email: "", password: "" });
      setErrors({});
    }
  };

  // Destructure formData for easier access
  const { username, email, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username} // Use destructured variable
            onChange={handleChange}
          />
        </label>
        {errors.username && (
          <span style={{ color: "red" }}>{errors.username}</span>
        )}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email} // Use destructured variable
            onChange={handleChange}
          />
        </label>
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password} // Use destructured variable
            onChange={handleChange}
          />
        </label>
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
