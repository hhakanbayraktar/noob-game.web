import "./HypesOfYearItem.scss";
import Utils from "../../utils/Utils.js";
import { Link } from "react-router-dom";

type hypesOfYearType = {
  id: number;
  name: string;
  totalRating: number;
  cover: string;
  genre: string;
};

const HypesOfYearItem = ({
  id,
  name,
  totalRating,
  cover,
  genre,
}: hypesOfYearType) => {
  return (
    <div className="hypes-of-year">
      <Link to={`/gameDetail/${id}`}>
        <div className="game-card">
          <div className="game-card-cover">
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg`}
              alt={name}
            />
            <div className="game-card-overlay">
              Read
              <br />
              More
            </div>
          </div>
          <div className="body d-flex flex-column">
            <div className="game">
              <div className="name">{Utils.textShortener(name, 18)}</div>
              <div className="type">{Utils.textShortener(genre, 28)}</div>
            </div>
            <div className="rate">
              {totalRating !== null ? totalRating.toFixed(0) + "%" : ""}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HypesOfYearItem;
