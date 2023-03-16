import publicClient from "./public.client";

const noobgameEndpoints = {
  getList: "gameList",
  topGames: "topGames",
  popularGames: "popularGames",
  hypesOfYear: "hypesOfYear",
  lastPlatformGames: ({ id }) => `lastPlatformGames?id=${id}`,
};

const noobgameApi = {
  getList: async () => {
    try {
      const response = await publicClient
        .get(noobgameEndpoints.getList)
        .then((response) => {
          return response.data;
        });

        return {response};
    } catch (err) {
      return err.message;
    }
  },
  topGames: async () => {
    try {
      const response = await publicClient
        .get(noobgameEndpoints.topGames)
        .then((response) => {
          return response.data;
        });

        return {response};
    } catch (err) {
      return err.message;
    }
  },
  popularGames: async () => {
    try {
      const response = await publicClient
        .get(noobgameEndpoints.popularGames)
        .then((response) => {
          return response.data;
        });

        return {response};
    } catch (err) {
      return err.message;
    }
  },
  hypesOfYear: async () => {
    try {
      const response = await publicClient
        .get(noobgameEndpoints.hypesOfYear)
        .then((response) => {
          return response.data;
        });

        return {response};
    } catch (err) {
      return err.message;
    }
  },
  lastPlatformGames: async ({ id }) => {
    try {
      const response = await publicClient
        .get(noobgameEndpoints.lastPlatformGames({ id }))
        .then((response) => {
          return response.data;
        });

      return {response};
    } catch (err) {
      return err.message;
    }
  },
};

export default noobgameApi;
