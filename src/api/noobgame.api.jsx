import publicClient from "./public.client";
import React from "react";

const apiGet = (endPoint)=>{
  return async () => {
    const response = await publicClient
      .get(endPoint)
      .then((response) => {
        return response.data;
      })
    return response;
  }
}

const noobgameApi = {
  getList: apiGet("gameList"),
  topGames: apiGet("topGames"),
  popularGames: apiGet("popularGames"),
};


export default noobgameApi;
