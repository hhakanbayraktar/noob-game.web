import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import RecentlyReviewed from "./components/popularGames/PopularGames";
import Slider from "./components/slider/Slider";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <RecentlyReviewed />
    </div>
  );
}

export default App;
