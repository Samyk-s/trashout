import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/home/home.pages";
import HomePageLayout from "../layout/homepage/homepage.layout";

import NotFoundPage from "../pages/Notfound/notfound.page";
import DestinationsGrid from "../pages/destinations/destinations.page";
import Tools from "../pages/Tools/tools";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      { path: "/destinations",
        element: <DestinationsGrid /> 
      },
      {
        path: "/tools",
        element: <Tools/>,
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
