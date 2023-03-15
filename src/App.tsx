import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Games from "./pages/games/Games";

function App() {
  const Layout = () => {
    return (
      <div className="App">
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
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/games",
          element: <Games />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
