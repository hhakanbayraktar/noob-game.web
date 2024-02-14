import "./GameDetail.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Underscratch from "../../components/underscratch/Underscratch";
import { useEffect, useState } from "react";
import noobgameApi from "../../api/noobgame.api";
import { toast } from "react-toastify";
import Utils from "../../utils/Utils";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FavouriteButton from "../../components/favouriteButton/FavouriteButton";
import Button from "react-bootstrap/esm/Button";
import { setFavourites } from "../../redux/reducers/UserSlice";
import userApi from "../../api/user.api";

const GameDetail = () => {
  const { id } = useParams();

  const [photoShow, setPhotoShow] = useState(-1);
  const [game, setGame] = useState<Game>();

  SwiperCore.use([Autoplay, Navigation]);

  const photos = () => {
    var newArr: Photo[] = [];

    game?.screenshots.values?.map((screenshot) => {
      let photo: Photo = {
        src: `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${screenshot.imageId}.jpg`,
        height: screenshot.height,
        width: screenshot.width,
      };

      newArr.push(photo);
    });

    return newArr;
  };

  useEffect(() => {
    const getGameDetail = async () => {
      const { response, err } = await noobgameApi.gameDetail({ id: id });

      if (response) setGame(response);
      if (err) toast.error(err);
    };
    getGameDetail();
  }, []);

  return (
    <div className="content">
      <div className="image">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game?.screenshots.values[0].imageId}.jpg`}
          alt=""
        />
      </div>
      <div className="game-container">
        <div className="game-row d-flex justify-content-start flex-nowrap">
          <div className="cover">
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover.value.imageId}.jpg`}
              alt=""
            />
            <div className="information">
              <div className="optimisly-game-maininfo">
                <div
                  className={`${
                    game?.involvedCompanies ? "d-block" : "d-none"
                  }`}
                >
                  <Underscratch text="Companies" logo={null} />
                  <div className="companies">
                    {game?.involvedCompanies?.values?.map(
                      (involvedCompany, index) => (
                        <div key={index}>
                          <span className="block">
                            {involvedCompany.company.value.name}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className={`${game?.gameEngines ? "d-block" : "d-none"}`}>
                  <Underscratch text="Game Engines" logo={null} />
                  <div className="game-engines">
                    {game?.gameEngines?.values?.map((gameEngine, index) => (
                      <div key={index}>
                        <span className="block">{gameEngine.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`${
                    game?.gameModes || game?.playerPerspectives
                      ? "d-block"
                      : "d-none"
                  }`}
                >
                  <Underscratch text="Game Type" logo={null} />
                  <div
                    className={`game-modes ${
                      game?.gameModes ? "d-block" : "d-none"
                    }`}
                  >
                    <span className="category">Game Mode:</span>{" "}
                    {game?.gameModes?.values?.map((gameMode, index) => (
                      <div key={index}>
                        <span className="block">{gameMode.name}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`game-player-perspectives ${
                      game?.playerPerspectives ? "d-block" : "d-none"
                    }`}
                  >
                    <span className="category">Player Perspectives:</span>{" "}
                    {game?.playerPerspectives?.values?.map(
                      (playerPerspective, index) => (
                        <div key={index}>
                          <span className="block">
                            {playerPerspective.name}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className={`${game?.genres ? "d-block" : "d-none"}`}>
                  <Underscratch text="Genre" logo={null} />
                  <div className="genre">
                    {game?.genres?.values?.map((genre, index) => (
                      <div key={index}>
                        <span className="block">{genre.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${game?.releaseDates ? "d-block" : "d-none"}`}>
                  <Underscratch text="Release Dates" logo={null} />
                  <div className="release-date">
                    {game?.releaseDates.values?.map((releaseDate, index) => (
                      <div key={index}>
                        <div className="platform">
                          {releaseDate.platform.value.name}
                        </div>
                        <div>{releaseDate.human}</div>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`${game?.alternativeNames ? "d-block" : "d-none"}`}
                >
                  <Underscratch text="Alternative Names:" logo={null} />
                  <div className="alternative-names">
                    {game?.alternativeNames?.values
                      .sort((a, b) => a.comment.localeCompare(b.comment))
                      .map((alternativeName, index) => (
                        <div key={index}>
                          <div className="language">
                            {alternativeName.comment.replace(" title", "")}
                          </div>
                          <div>{alternativeName.name}</div>
                          <hr />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="summary">
            <div className="title-container">
              <div className="gamepage-title-wrapper">
                <div className="banner-title ">{game?.name}</div>
                <div className="banner-subheading">
                  <span>{Utils.formatDate(game?.firstReleaseDate)}</span>
                </div>
                <div className="banner-subsubheading">
                  <span>
                    {game?.involvedCompanies?.values[0]?.company.value.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="details">
              <div className={`${game?.summary ? "d-block" : "d-none"}`}>
                <Underscratch text="Summary" logo={null} />
                <div className="summary">{game?.summary}</div>
              </div>

              <div className={`${game?.storyline ? "d-block" : "d-none"}`}>
                <Underscratch text="storyline" logo={null} />
                <div className="storyline">{game?.storyline}</div>
              </div>

              <div className={`${game?.platforms ? "d-block" : "d-none"}`}>
                <Underscratch text="Platforms" logo={null} />
                <div className="platforms">
                  {game?.platforms?.values?.map((platform, index) =>
                    platform.platformLogo ? (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platformLogo.value.imageId}.png`}
                        alt={platform.name}
                        key={index}
                      />
                    ) : (
                      ""
                    )
                  )}{" "}
                </div>
              </div>

              <Underscratch text="AGE RATING" logo={null} />
              <div className="age-rating">
                <img
                  src="https://www.igdb.com/assets/esrb/esrb_t-addf8c69e4e93438b2a4cf046972279b7f9a6448929fbb0b0b7b7c28a0e60a24.png"
                  alt=""
                />
                <img
                  src="https://www.igdb.com/assets/pegi/PEGI_12-5c83ad44ed32a4c9bd40019d9817ba2ef69d2081db831285c64bfe08002a79ae.png"
                  alt=""
                />
                <img
                  src="https://www.igdb.com/assets/cero/CERO-C-b62841527ba6465a361601c16b4572676bdccfeb5f50caf1dc852ac8adcadcd2.png"
                  alt=""
                />
                <img
                  src="https://www.igdb.com/assets/usk/USK-12-b06a58c13f5f5bb93f938013ab77cdb3163f62eb91b8ad4cb116c7a7733dc94f.png"
                  alt=""
                />
              </div>

              <div className={`${game?.screenshots ? "d-block" : "d-none"}`}>
                <Underscratch text="Gallery" logo={null} />
                <div className="gallery">
                  <PhotoAlbum
                    layout="columns"
                    columns={(containerWidth) => {
                      if (containerWidth < 400) return 2;
                      if (containerWidth < 800) return 3;
                      return 5;
                    }}
                    photos={photos()}
                    onClick={({ index }) => {
                      setPhotoShow(index);
                    }}
                  />

                  <Lightbox
                    slides={photos()}
                    open={photoShow >= 0}
                    index={photoShow}
                    close={() => setPhotoShow(-1)}
                    // enable optional lightbox plugins
                    plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                  />
                </div>
              </div>
            </div>
            <div className="game-rate">
              <CircularProgressbar
                value={game?.totalRating as number}
                text={`${game?.totalRating.toFixed(0)}%`}
                styles={buildStyles({
                  textSize: "24px",
                  textColor: "#000",
                  pathColor: "#10af65",
                  trailColor: "#d6d6d6",
                })}
              />
              <FavouriteButton
                gameId={parseInt(id as string) as number}
                gameName={game?.name as string}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="games-slider">
          <Swiper
            loop={true}
            spaceBetween={0}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                width: 480,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              992: {
                width: 992,
                slidesPerView: 2,
              },
            }}
          >
            {game?.videos.values?.map((video, index) => (
              <SwiperSlide key={index}>
                <iframe
                  width="100%"
                  height="350px"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                ></iframe>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;

type Game = {
  id: number;
  alternativeNames: {
    values: [
      {
        comment: string;
        name: string;
      }
    ];
  };
  cover: {
    value: {
      imageId: string;
    };
  };
  created_at: number;
  firstReleaseDate: string;
  gameEngines: {
    values: [
      {
        name: string;
      }
    ];
  };
  gameModes: {
    values: [
      {
        name: string;
      }
    ];
  };
  genres: {
    values: [
      {
        name: string;
      }
    ];
  };
  hypes: number;
  involvedCompanies: {
    values: [
      {
        company: {
          value: {
            name: string;
          };
        };
      }
    ];
  };
  name: string;
  platforms: {
    values: [
      {
        name: string;
        platformLogo: {
          value: {
            imageId: string;
          };
        };
      }
    ];
  };
  playerPerspectives: {
    values: [
      {
        name: string;
      }
    ];
  };
  releaseDates: {
    values: [
      {
        human: string;
        platform: {
          value: {
            name: string;
          };
        };
      }
    ];
  };
  screenshots: {
    values: [
      {
        imageId: string;
        width: number;
        height: number;
      }
    ];
  };
  storyline: string;
  summary: string;
  totalRating: number;
  videos: {
    values: [
      {
        name: string;
        videoId: string;
      }
    ];
  };
};

type Photo = {
  src: string;
  width: number;
  height: number;
};
