import React from "react";
import HypesOfYear from "../../components/hypesOfYear/HypesOfYear";
import Top20 from "../../components/top20/Top20";
import "./Games.scss";

const Games = () => {
  return (
    <div className="games container">
      <HypesOfYear />
      <Top20/>
    </div>
  );
};

export default Games;
