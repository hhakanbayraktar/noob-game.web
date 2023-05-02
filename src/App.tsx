import "./App.scss";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Games from "./pages/games/Games";
import { toast, ToastContainer } from "react-toastify";
import GameDetail from "./pages/gameDetail/GameDetail";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites, setUser } from "./redux/reducers/UserSlice";
import { useEffect } from "react";
import userApi from "./api/user.api";

type State = {
  user: {
    user: {
      token: string;
      expireOn: Date;
    };
  };
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state:State) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userJson = JSON.parse(user);
        if (new Date(userJson.expireOn) > new Date()) {
          dispatch(setUser(userJson));
        } else {
          localStorage.removeItem("user");
          dispatch(setUser(null));
        }
      } else dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await userApi.userFavourites();

      if (response) dispatch(setFavourites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setFavourites([]));
  }, [user, dispatch]);

  const Layout = () => {
    return (
      <div className="App">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/games",
          element: <Games />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/gameDetail/:id",
          element: <GameDetail />,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ]);

  function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>{error as string}</div>;
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
