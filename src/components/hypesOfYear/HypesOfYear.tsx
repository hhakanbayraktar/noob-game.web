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
  id: number;
  name: string;
  totalRating: number;
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
          breakpoints={{
            480: {
              width: 480,
              slidesPerView: 2,
            },
            768: {
              width: 768,
              slidesPerView: 3,
            },
            992: {
              width: 992,
              slidesPerView: 4,
            },
          }}
        >
          {games.map((game, index) => (
            <SwiperSlide key={index}>
              <HypesOfYearItem
                key={index}
                id={game.id}
                name={game.name}
                cover={game.cover}
                totalRating={game.totalRating}
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
