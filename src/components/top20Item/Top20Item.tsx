import "./Top20Item.scss";
import Utils from "../../utils/Utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  gameName: string;
  genre: string;
  gameRate: number;
  gameImg: string;
};

const Top20Item = ({id, gameName, genre, gameRate, gameImg }: Props) => {
  return (
    <div className="top20-item-box">
      <Link to={`/gameDetail/${id}`}>
        <div className="top20-image position-relative">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameImg}.jpg`}
            alt=""
          />
        </div>
        <div className="top20-text-area">
          <div className="top20-item-rate">
            <CircularProgressbar
              value={gameRate}
              text={`${gameRate.toFixed(0)}%`}
              styles={buildStyles({
                textSize: "24px",
                textColor: "#fff",
                pathColor: "#10af65",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <div className="top20-item-text">
            <div className="game-name">{Utils.textShortener(gameName, 27)}</div>
            <div className="game-type">{Utils.textShortener(genre, 32)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Top20Item;
