import "./PopularGamesItem.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

type Props = {
  id: number,
  gameName: string;
  genre: string;
  gameRate: number;
  gameImg: [{}];
};

const PopularGamesItem = ({ id, gameName, genre, gameRate, gameImg }: Props) => {
  return (
    <Link to={`/gameDetail/${id}`}>
      <div className="popular-game-box">
        <div className="popular-game-item position-relative">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${gameImg[0]}.jpg`}
            alt=""
          />
        </div>

        <div className="popular-game-text-area">
          <div className="popular-game-item-text">
            <p className="game-name">{gameName}</p>
            <p className="game-type">{genre}</p>
          </div>
          <div className="popular-game-item-rate">
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
        </div>
      </div>
    </Link>
  );
};

export default PopularGamesItem;
