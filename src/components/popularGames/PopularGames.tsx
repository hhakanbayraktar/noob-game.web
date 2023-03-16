import "./PopularGames.scss";
import PopularGamesItem from "../popularGamesItem/PopularGamesItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import noobgameApi from "../../api/noobgame.api.jsx";
import Underscratch from "../underscratch/Underscratch";
import Utils from "../../utils/Utils";

type popularGame = {
  id: string;
  name: string;
  aggregatedRating: number;
  imageList: [{}];
  genre: string;
};
const PopularGames = () => {
  const [games, setGames] = useState<popularGame[]>([]);

  useEffect(() => {
    const getPopularGameList = async () => {
      const {response, err} = await noobgameApi.popularGames();
      if (response) setGames(response);
      if (err) toast.error(err);
    };
    getPopularGameList();
  }, []);

  return (
    <div className="row mt-5">
        <Underscratch text="POPULAR GAMES" logo={null}/>
        <div className="ml-0 ">
          {games.map((game, index) =>
            index === 3 ? (
              <div className="col-xl-8 float-lg-start" key={index}>
                <PopularGamesItem
                  gameName={game.name}
                  genre={game.genre}
                  gameRate={game.aggregatedRating}
                  gameImg={game.imageList}
                />
              </div>
            ) : (
              <div className="col-xl-4  float-lg-end" key={index}>
                <PopularGamesItem 
                  gameName={Utils.textShortener(game.genre, 28)}
                  genre={Utils.textShortener(game.genre, 32)}
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
