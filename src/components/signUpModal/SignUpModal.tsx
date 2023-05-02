import "./SignUpModal.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAuthModalOpen,
  setFormType,
} from "../../redux/reducers/AuthModalSlice";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../../api/user.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { setUser } from "../../redux/reducers/UserSlice";

type FormProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpModal = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const selectForm = (form: string) => {
    dispatch(setFormType(form));
  };

  const signUpForm = useFormik<FormProps>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name minimum 2 characters")
        .required("Name is required"),
      surname: Yup.string()
        .min(2, "Surname minimum 2 characters")
        .required("Surname is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("E-Mail is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Please retype your password.")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);

      const { response, err } = await userApi.addUser(values);

      if (response) {
        signUpForm.resetForm();
        dispatch(setAuthModalOpen(false));
        toast.success("Sign up success. Please check your e-mail.");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <div>
      <form onSubmit={signUpForm.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={signUpForm.values.name}
              onChange={signUpForm.handleChange}
            />
            <span>{signUpForm.errors.name}</span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Enter your surname"
              value={signUpForm.values.surname}
              onChange={signUpForm.handleChange}
            />
            <span>{signUpForm.errors.name}</span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={signUpForm.values.email}
              onChange={signUpForm.handleChange}
            />
            <span>{signUpForm.errors.email}</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={signUpForm.values.password}
              onChange={signUpForm.handleChange}
            />
            <span>{signUpForm.errors.password}</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={signUpForm.values.confirmPassword}
              onChange={signUpForm.handleChange}
            />
            <span>{signUpForm.errors.confirmPassword}</span>
          </div>
          
          {errorMessage && (
            <div className="w-100">
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="btn-sign">
            Sign Up
          </Button>
          <Button
            onClick={() => selectForm("sign-in")}
            type="submit"
            className="btn-sign btn-sign-transparent"
          >
            Sign In
          </Button>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default SignUpModal;
