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
        <Field type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="email" name="email" placeholder="E-Mail" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <Field type="checkbox" name="terms" checked={values.terms} />
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
        </ul>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      terms: terms || false,
      name: name || "",
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
    terms: Yup.string().required("Please agree to our terms of service")
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
