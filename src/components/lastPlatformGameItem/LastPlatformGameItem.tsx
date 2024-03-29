import { useEffect, useState } from "react";
import Underscratch from "../underscratch/Underscratch";
import noobgameApi from "../../api/noobgame.api.jsx";
import Utils from "../../utils/Utils.js";
import { toast } from "react-toastify";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faDesktop } from "@fortawesome/free-solid-svg-icons";
import "./LastPlatformGameItem.scss";
import { Link } from "react-router-dom";

type Props = {
  platform: string;
};

type LastPlatformGame = {
  id: number;
  cover: {
    id: number;
    value: {
      imageId: string;
    };
  };
  name: string;
  firstReleaseDate: Date;
};

const LastPlatformGameItem = ({ platform }: Props) => {
  const [lastPlatformGamesList, setLastPlatformGamesList] = useState<
    LastPlatformGame[]
  >([]);

  useEffect(() => {
    const getLastPlatformGameItem = async () => {
      let platformId = 0;
      if (platform === "pc") platformId = 6;
      else if (platform === "ps5") platformId = 167;
      else if (platform === "xbox") platformId = 169;

      const { response, err } = await noobgameApi.lastPlatformGames({
        id: platformId,
      });

      if (response) setLastPlatformGamesList(response);
      if (err) toast.error(err);
    };
    getLastPlatformGameItem();
  }, []);

  return (
    <div className="coming-soon mt-5 mb-5">
      <div className="coming-soon-header">
        <span>
          <Underscratch
            text={
              platform === "pc"
                ? "PC"
                : platform === "ps5"
                ? "PlayStation"
                : "Xbox"
            }
            logo={
              platform === "pc"
                ? faDesktop
                : platform === "ps5"
                ? faPlaystation
                : faXbox
            }
          />
        </span>
        <span className="coming-soon-angle">
          <FA icon={faAngleRight} />
        </span>
      </div>
      <div className="game mt-4">
        {lastPlatformGamesList.map((game, index) => (
          <Link
            to={`/gameDetail/${game.id}`}
            className="d-flex justify-content-start mt-2"
            key={index}
          >
            <div className="game-image col-xs-4">
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.value.imageId}.jpg`}
                alt=""
              />
            </div>
            <div className="game-body col-xs-8 align-self-center">
              <div className="game-name">{game.name}</div>
              <div className="date">{Utils.formatDate(game.firstReleaseDate)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LastPlatformGameItem;
