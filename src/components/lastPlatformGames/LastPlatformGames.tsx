import LastPlatformGameItem from "../lastPlatformGameItem/LastPlatformGameItem";
import Underscratch from "../underscratch/Underscratch";

const LastPlatformGames = () => {
  return (
    <div className="row mt-5">
      <div className="">
          <Underscratch text="COMING SOON" logo={null}/>
      </div>
      <div className="d-flex justify-content-between">
        <div className="col-xl-4">
          <LastPlatformGameItem platform="pc" />
        </div>
        <div className="col-xl-4">
          <LastPlatformGameItem platform="ps5" />
        </div>
        <div className="col-xl-4">
          <LastPlatformGameItem platform="xbox" />
        </div>
      </div>
    </div>
  );
};

export default LastPlatformGames;
