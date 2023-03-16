import "./HypesOfYearItem.scss";
import Utils from "../../utils/Utils.js";

type hypesOfYearType = {
  name: string;
  aggregatedRating: number;
  cover: string;
  genre: string;
};

const HypesOfYearItem = ({
  name,
  aggregatedRating,
  cover,
  genre,
}: hypesOfYearType) => {
  return (
    <div className="hypes-of-year">
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
            <div className="name">{Utils.textShortener(name, 20)}</div>
            <div className="type">{Utils.textShortener(genre, 30)}</div>
          </div>
          <div className="rate">
            {aggregatedRating !== null ? aggregatedRating.toFixed(0) + "%" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypesOfYearItem;
