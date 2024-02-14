import "./FavouriteButton.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { deleteFavourite, addFavourite } from "../../redux/reducers/UserSlice";
import userApi from "../../api/user.api";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

type FavouriteButtonProps = {
  gameId: number;
  gameName: string;
};

type State = {
  user: {
    user: {
      token: string;
      expireOn: Date;
      userDetail: {
        id: string;
        name: string;
        surname: string;
        email: string;
      };
    };
    favourites: number[];
  };
};

type StateSignalR = {
  signalR: {
    hubConn: any;
  };
};

const FavouriteButton = ({ gameId, gameName }: FavouriteButtonProps) => {
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const { user, favourites } = useSelector((state: State) => state.user);
  const { hubConn } = useSelector((state: StateSignalR) => state.signalR);

  useEffect(() => {
    const isFavouriteGame = async () => {
      if (user) {
        if (favourites.includes(gameId)) {
          setIsFavourite(true);
        }
      }
    };
    isFavouriteGame();
  }, [favourites]);

  const onFavouriteClick = async () => {
    if (onRequest) return;

    setOnRequest(true);

    if (isFavourite) {
      const { response, err } = await userApi.deleteFavourite({
        gameId: gameId,
      });

      if (response) toast.success(response.message);
      if (err) toast.error(err);

      dispatch(deleteFavourite(gameId));
      setIsFavourite(false);
    } else {
      const { response, err } = await userApi.addFavourite({ gameId: gameId });

      if (response) toast.success(response.message);
      if (err) toast.error(err);

      dispatch(addFavourite(gameId));
      sendMsg();
      setIsFavourite(true);
    }

    setOnRequest(false);
  };

  const sendMsg = async () => {
    if (hubConn) {
      hubConn
        .invoke("SendMessage", `${user.userDetail.name} ${user.userDetail.surname} added ${gameName} to favorites`)
        .then((res: any) => {console.log(res)});
    }
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
