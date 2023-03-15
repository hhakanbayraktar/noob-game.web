import "./Underscratch.scss";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  text: string;
  logo: IconProp | null;
};

const Underscratch = ({ text, logo }: Props) => {
  return (
    <span className="underscratch underscratch-green text-lg-start">
      {logo !== null && <FA className="logo" icon={logo} />} {text}
    </span>
  );
};

export default Underscratch;
