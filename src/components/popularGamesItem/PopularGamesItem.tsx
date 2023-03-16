import "./PopularGamesItem.scss";

type Props = {
  gameName: string;
  genre: string;
  gameRate: number;
  gameImg: [{}];
};

const PopularGamesItem = ({ gameName, genre, gameRate, gameImg }: Props) => {
  return (
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
        <div className="popular-game-item-rate">{gameRate.toFixed(0)}%</div>
      </div>
    </div>
  );
};

export default PopularGamesItem;
