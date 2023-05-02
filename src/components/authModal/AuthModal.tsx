import "./AuthModal.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { setAuthModalOpen } from "../../redux/reducers/AuthModalSlice.js";
import SignInModal from "../signInModal/SignInModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUpModal from "../signUpModal/SignUpModal";

type State = {
  authModal: {
    authModalOpen: boolean;
    formType: string;
  };
};

const AuthModal = () => {
  const show = useSelector((state: State) => state.authModal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setAuthModalOpen(false));

  return (
    <Modal show={show.authModalOpen} onHide={handleClose} centered>
      <Modal.Header text-xl-center>
        <Modal.Title>
          <img src="/noobgame.png" alt="Noob-Game" width={300} />
        </Modal.Title>
      </Modal.Header>
      {show.formType != "sign-up" ? <SignInModal /> : <SignUpModal />}
    </Modal>
  );
};

export default AuthModal;
