import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import AuthModal from "../authModal/AuthModal";
import {
  setAuthModalOpen,
  setFormType,
} from "../../redux/reducers/AuthModalSlice.js";
import { setUser } from "../../redux/reducers/UserSlice";

type State = {
  user: {
    user: {
      token: string;
      expireOn: Date;
    };
  };
};

const Navbar = () => {
  const dispatch = useDispatch();
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  const { user } = useSelector((state: State) => state.user);

  return (
    <div className="menu">
      {isAboveMediumScreens ? (
        <div className="navbar d-flex">
          <div className="p-2">
            <Link to="/">
              <img src="/noobgame.png" alt="Noob-Game" />
            </Link>
          </div>
          <div className="menu-item p-2 d-flex gap-3">
            <Link to="/">Home</Link>
            <Link to="/games">Games</Link>
          </div>
          <div className="ms-auto p-2">
            {!user ? (
              <button
                className="btn-noob-game"
                onClick={() => {
                  dispatch(setAuthModalOpen(true));
                  dispatch(setFormType("sign-in"));
                }}
              >
                Sign In / Up
              </button>
            ) : (
              <button
                className="btn-noob-game"
                onClick={() => {
                  dispatch(setUser(null));
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar navbar-expand-xljustify-content-start">
          <div className="p-4 d-flex justify-content-start">
            <Link to="/">
              <img src="/noobgame.png" alt="Noob-Game" />
            </Link>
          </div>
          <div className="d-flex justify-content-end p-4">
            <button
              onClick={() => setIsMenuToggled(!isMenuToggled)}
              className="mobile-menu-btn-open"
            >
              <FA icon={faBars} />
            </button>
          </div>
        </div>
      )}

      {!isAboveMediumScreens && isMenuToggled && (
        <div className="mobile-menu d-flex flex-column mb-3 w-50 position-absolute end-0 top-0">
          <div className="d-flex">
            <div className="justify-content-start pt-4">
              {!user ? (
                <button
                  className="btn-noob-game"
                  onClick={() => {
                    dispatch(setAuthModalOpen(true));
                    dispatch(setFormType("sign-in"));
                  }}
                >
                  Sign In / Up
                </button>
              ) : (
                <button
                  className="btn-noob-game"
                  onClick={() => {
                    dispatch(setUser(null));
                  }}
                >
                  Logout
                </button>
              )}
            </div>
            <div className="ms-auto p-4 mt-2">
              <button
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                className="mobile-menu-btn-close"
              >
                <FA icon={faX} />
              </button>
            </div>
          </div>
          <div className="menu-item d-flex align-items-start flex-column mt-0">
            <Link to="/">Home</Link>
            <Link to="/games">Games</Link>
          </div>
        </div>
      )}
      <AuthModal />
    </div>
  );
};

export default Navbar;
