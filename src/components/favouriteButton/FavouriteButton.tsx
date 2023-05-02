import "./FavouriteButton.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { deleteFavourite, addFavourite } from "../../redux/reducers/UserSlice";
import userApi from "../../api/user.api";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

type State = {
  user: {
    user: {
      token: string;
      expireOn: Date;
    };
    favourites: number[];
  };
};

const FavouriteButton = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const { user, favourites } = useSelector((state: State) => state.user);

  useEffect(() => {
    const isFavouriteGame = async () => {
      if (favourites.includes(parseInt(id as string) as number))
        setIsFavourite(true);
        console.log("Initial",isFavourite)
    };
    isFavouriteGame();
  }, []);

  const onFavouriteClick = async () => {
    if (onRequest) return;

    let gameId = parseInt(id as string) as number;

    setOnRequest(true);

    if (isFavourite) {
      const { response, err } = await userApi.deleteFavourite({
        gameId: gameId,
      });

      if (response) toast.success(response.message);
      if (err) toast.error(err);

      setIsFavourite(false);
      console.log("isfav Del:", isFavourite);
      dispatch(deleteFavourite(gameId));
    } else {
      const { response, err } = await userApi.addFavourite({ gameId: gameId });

      if (response) toast.success(response.message);
      if (err) toast.error(err);

      setIsFavourite(true);
      console.log("isfav Add:", isFavourite);
      dispatch(addFavourite(gameId));
    }

    setOnRequest(false);
  };

  return (
    <>
      {user && (
        <Button className="btn-favourite" onClick={() => onFavouriteClick()}>
          <div className="favourite ms-auto">
            {isFavourite ? <FA icon={faHeart} /> : <FA icon={faHeartRegular} />}
          </div>
        </Button>
      )}
    </>
  );
};

export default FavouriteButton;
