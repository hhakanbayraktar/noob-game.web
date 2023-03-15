import Navbar from "../../components/navbar/Navbar";
import PopularGames from "../../components/popularGames/PopularGames";
import Slider from "../../components/slider/Slider";
import LastPlatformGames from "../../components/lastPlatformGames/LastPlatformGames";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Slider />
      <div className="container">
        <PopularGames />
        <LastPlatformGames />
      </div>
    </div>
  );
};

export default Home;
