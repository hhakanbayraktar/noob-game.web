import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "..//components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites, setUser } from "../redux/reducers/UserSlice";
import { useEffect } from "react";
import userApi from "../api/user.api";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { setHubConn } from "../redux/reducers/SignalRSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [hubConnection, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    const authUser = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userJson = JSON.parse(user);
        if (new Date(userJson.expireOn) > new Date()) {
          dispatch(setUser(userJson));

          const { response, err } = await userApi.userFavourites();

          if (response) dispatch(setFavourites(response));
          if (err) toast.error(err.message);
        } else {
          localStorage.removeItem("user");
          dispatch(setUser(null));
        }
      } else dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    createHubConnection();
  }, []);

  const createHubConnection = async () => {
    const conn = new HubConnectionBuilder()
      .withAutomaticReconnect([1000, 3000, 3000, 3000])
      .withUrl("https://localhost:7263/NoobGameHub")
      .build();

    try {
      await conn.start();
      console.log(conn.connectionId);
      setHubConnection(conn);
      dispatch(setHubConn(conn))
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (message: string) => {
        toast.info(message);
        console.log(hubConnection)
      });
    }
  }, [hubConnection]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
