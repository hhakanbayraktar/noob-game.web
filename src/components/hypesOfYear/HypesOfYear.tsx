import "./HypesOfYear.scss";
import HypesOfYearItem from "../hypesOfYearItem/HypesOfYearItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import noobgameApi from "../../api/noobgame.api.jsx";
import Underscratch from "../underscratch/Underscratch";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

type hypesOfYearType = {
  id: string;
  name: string;
  aggregatedRating: number;
  cover: string;
  genre: string;
};

const HypesOfYear = () => {
  SwiperCore.use([Autoplay, Navigation]);

  const [games, setGames] = useState<hypesOfYearType[]>([]);

  useEffect(() => {
    const getHypesOfYearList = async () => {
      const { response, err } = await noobgameApi.hypesOfYear();

      if (response) setGames(response);
      if (err) toast.error(err);
    };
    getHypesOfYearList();
  }, []);

  return (
    <div className="row">
      <Underscratch text="HYPES OF YEAR" logo={null} />
      <div className="games-slider">
        <Swiper
          loop={true}
          spaceBetween={25}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
        >
          {games.map((game, index) => (
            <SwiperSlide>
              <HypesOfYearItem
                key={index}
                name={game.name}
                cover={game.cover}
                aggregatedRating={game.aggregatedRating}
                genre={game.genre}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HypesOfYear;
