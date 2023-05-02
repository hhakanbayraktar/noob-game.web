import "./SignInModal.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import {
  setAuthModalOpen,
  setFormType,
} from "../../redux/reducers/AuthModalSlice";
import { setUser } from "../../redux/reducers/UserSlice.js";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../../api/user.api";
import { toast } from "react-toastify";
import { useState } from "react";

type FormProps = {
  email: string;
  password: string;
};

const SignInModal = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const selectForm = (form: string) => {
    dispatch(setFormType(form));
  };

  const signInForm = useFormik<FormProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("E-Mail is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");

      const { response, err } = await userApi.createToken(values);

      if (response) {
        signInForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }
      
      if (err) setErrorMessage(err);
    },
  });

  return (
    <div>
      <form onSubmit={signInForm.handleSubmit} >
        <Modal.Body>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={signInForm.values.email}
              onChange={signInForm.handleChange}
              color="success"
            />
            <span>{signInForm.errors.email}</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              color="success"
            />
            <span>{signInForm.errors.password}</span>
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
            Sign In
          </Button>
          <Button
            onClick={() => selectForm("sign-up")}
            type="submit"
            className="btn-sign btn-sign-transparent"
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default SignInModal;
