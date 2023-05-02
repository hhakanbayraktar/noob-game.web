import { useEffect, useState } from "react";
import Top20Item from "../top20Item/Top20Item";
import Underscratch from "../underscratch/Underscratch";
import noobgameApi from "../../api/noobgame.api";
import { toast } from "react-toastify";

type TopGame = {
  id: number;
  name: string;
  totalRating: number;
  cover: string;
  genre: string;
};

const Top20 = () => {
  const [games, setGames] = useState<TopGame[]>([]);

  useEffect(() => {
    const getTop20GameList = async () => {
      const { response, err } = await noobgameApi.top20GamesAllTimes();

      if (response) setGames(response);
      if (err) toast.error(err);
    };
    getTop20GameList();
  }, []);

  return (
    <div className="row mt-5">
      <Underscratch text="Top 20 All Time" logo={null} />
      <div className="d-flex justify-content-between  flex-wrap">
      {games.map((game, index) =>
        <Top20Item key={index}
        id={game.id}
        gameName={game.name}
        genre={game.genre}
        gameRate={game.totalRating}
        gameImg={game.cover}/>)}
      </div>
    </div>
  );
};

export default Top20;
