import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  return (
    <div className="menu">
      {isAboveMediumScreens ? (
        <div className="navbar navbar-expand-xl d-flex flex-row justify-content-start">
          <div className="p-4">
            <img src="http://fisoft.co.uk/img/logo.png" alt="Noob-Game" />
          </div>
          <div className="d-flex gap-3">
            <Link to="" >Home</Link>
            <Link to="/">Games</Link>
            <Link to="/">Reviews</Link>
          </div>
        </div>
      ) : (
        <div className="navbar navbar-expand-xljustify-content-start bg-black">
          <div className="p-4 d-flex justify-content-start">
            <img src="http://fisoft.co.uk/img/logo.png" alt="Noob-Game" />
          </div>
          <div className="d-flex justify-content-end p-4">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <FA icon={faBars} />
            </button>
          </div>
        </div>
      )}

      {!isAboveMediumScreens && isMenuToggled && (
        <div className="d-flex flex-column mb-3 bg-black h-100 w-50 position-absolute end-0 top-0">
          <div className="d-flex justify-content-end p-4 align-items-end mt-2">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <FA icon={faX} />
            </button>
          </div>
          <div className="d-flex align-items-start ml-auto flex-column gap-1 m-3 mt-0">
            <Link to="">Home</Link>
            <Link to="/">Games</Link>
            <Link to="/">Reviews</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
