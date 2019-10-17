import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="form-container">
      <Form>
        <label>Name</label>
        <Field type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <label>E-Mail</label>
        <Field type="email" name="email" placeholder="E-Mail" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <label>Password</label>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label>Role</label>
        <Field component="select" name="role" placeholder="role">
          <option>Please Select an option</option>
          <option value="Web Developer">Web Developer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Mobile Developer">Mobile Developer</option>
        </Field>
        {touched.role && errors.role && <p className="error">{errors.role}</p>}
        <label>
          Terms of Service
          <Field type="checkbox" name="terms" checked={values.terms} />
        </label>

        {touched.terms && errors.terms && (
          <p className="error">{errors.terms}</p>
        )}

        <button type="submit"> Submit </button>
      </Form>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>E-Mail: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>Role: {user.role}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms, role }) {
    return {
      terms: terms || false,
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
    terms: Yup.string().required("Please agree to our terms of service"),
    role: Yup.string()
      .oneOf(["Web Developer", "Data Scientist", "Mobile Developer"])
      .required("Please select a role")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        console.log("response" + res);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);
export default FormikUserForm;
