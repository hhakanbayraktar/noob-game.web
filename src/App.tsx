import "./App.scss";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Games from "./pages/games/Games";
import { ToastContainer } from "react-toastify";
import GameDetail from "./pages/gameDetail/GameDetail";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";

function App() {
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
        <MainLayout />
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
