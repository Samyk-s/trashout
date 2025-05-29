import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/home/home.pages";
import HomePageLayout from "../layout/homepage/homepage.layout";
import TravelTips from "../pages/TravelTips/Traveltips";
import NotFoundPage from "../pages/Notfound/notfound.page";
import TrashDetect from "../pages/TrashDetect/TrashDetect";
import AboutUs from "../pages/About/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/about", // 👈 NEW ROUTE
        element: <AboutUs />,
      },
      {
        path: "/traveltips",
        element: <TravelTips />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const Routing = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routing;
