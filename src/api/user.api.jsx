import publicClient from "./public.client";
import privateClient from "./private.client";

const userEndpoints = {
  createToken: "createToken",
  addUser: "addUser",
  addFavourite: "addFavourite",
  deleteFavourite: ({ gameId }) => `deleteFavourite?gameId=${gameId}`,
  userFavourites: "userFavourites",
};

const userApi = {
  createToken: async ({ email, password }) => {
    try {
      const response = await publicClient
        .post(userEndpoints.createToken, { email, password })
        .then((response) => {
          return response.data;
        });

      return { response };
    } catch (e) {
      const err = e.data;
      return { err };
    }
  },
  addUser: async ({ name, surname, email, password }) => {
    try {
      const response = await publicClient
        .post(userEndpoints.addUser, { name, surname, email, password })
        .then((response) => {
          return response.data;
        });

      return { response };
    } catch (e) {
      const err = e.data;
      return { err };
    }
  },
  addFavourite: async ({ gameId }) => {
    try {
      const response = await privateClient
        .post(userEndpoints.addFavourite, { gameId })
        .then((response) => {
          return response.data;
        });

      return { response };
    } catch (e) {
      const err = e.data;
      return { err };
    }
  },
  deleteFavourite: async ({ gameId }) => {
    try {
      const response = await privateClient
        .delete(userEndpoints.deleteFavourite({ gameId }))
        .then((response) => {
          return response.data;
        });

      return { response };
    } catch (e) {
      const err = e.data;
      return { err };
    }
  },
  userFavourites: async () => {
    try {
      const response = await privateClient
        .get(userEndpoints.userFavourites)
        .then((response) => {
          return response.data;
        });

      return { response };
    } catch (e) {
      const err = e.data;
      return { err };
    }
  },
};

export default userApi;
