import "./PopularGames.scss";
import PopularGamesItem from "../popularGamesItem/PopularGamesItem";
import { useEffect, useState } from "react";
import noobgameApi from "../../api/noobgame.api.jsx";

type popularGameList = {
  id: string;
  name: string;
  aggregatedRating: number;
  imageList: [{}];
};
const PopularGames = () => {
  const [games, setGames] = useState<popularGameList[]>([]);

  useEffect(() => {
    const getPopularGameList = async () => {
      const response = await noobgameApi.popularGames();
      if (response) setGames(response);
    };
    getPopularGameList();
  }, []);

  return (
    <div className="container mt-5 position-relative">
      <span className="underscratch underscratch-green text-lg-start ">
        RECENTLY REVIEWED
      </span>
      <div className="mt-3 ml-0 justify-content-between">
        {games.map((game, index) =>
          index === 3 ? (
            <div className="col-xl-8 float-lg-start">
              <PopularGamesItem
                gameName={game.name}
                gameType={game.name}
                gameRate={game.aggregatedRating}
                gameImg={game.imageList}
              />
            </div>
          ) : (
            <div className="col-xl-4  float-lg-end">
              <PopularGamesItem
                gameName={game.name}
                gameType={game.name}
                gameRate={game.aggregatedRating}
                gameImg={game.imageList}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PopularGames;
