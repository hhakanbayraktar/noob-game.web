import "./Slider.scss";
import noobgameApi from "../../api/noobgame.api.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,  { Autoplay } from "swiper";
import "swiper/css";

type gameList = {
  name: string;
  artworks: {
    values: [
      {
        imageId: string;
      }
    ];
  };
  aggregatedRating: number;
};

const Slider = () => {
  SwiperCore.use([Autoplay]);
  const [games, setGames] = useState<gameList[]>([]);

  useEffect(() => {
    const getGameList = async () => {
      const {response, err} = await noobgameApi.topGames();

      if (response) setGames(response);
      if (err) toast.error(err);
    };
    getGameList();
  }, []);

  return (
    <div className="slider">
      <Swiper
        grabCursor={true}
        loop={true}
        /*autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}*/
        style={{ width: "100%" }}
        slidesPerView={1}
      >
        {games.map((game, index) =>
          game.artworks !== null ? (
            <SwiperSlide key={index}>
              <div className="slider-main">
                <img
                  className="slider-img  top-0 w-100"
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks.values[0].imageId}.png`}
                  alt=""
                />
              </div>
                <div className="slider-text">
                  {game.name}
                </div>
            </SwiperSlide>
          ) : (
            ""
          )
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
