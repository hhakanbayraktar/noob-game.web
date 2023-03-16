import React from "react";
import Top20Item from "../top20Item/Top20Item";
import Underscratch from "../underscratch/Underscratch";

const Top20 = () => {
  return (
    <div className="row mt-5">
      <Underscratch text="Top 20 All Time" logo={null} />
      <Top20Item />
      <Top20Item />
    </div>
  );
};

export default Top20;
