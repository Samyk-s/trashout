import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/home/home.pages";
import HomePageLayout from "../layout/homepage/homepage.layout";
import DestinationPage from "../pages/destinations/destinations.page";
import AboutPage from "../pages/about/about.page";
import VlogPage from "../pages/vlog/vlog.page";
import NotFoundPage from "../pages/Notfound/notfound.page";
import DestinationArticle from "../components/destination/destination.article";

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
        element: <DestinationPage /> 
    },
    { path: "/vlogs", 
        element: <VlogPage /> 
    },
    { path: "/about", 
        element: <AboutPage /> 
    },
    {
      path: "/article",
      element: <DestinationArticle />,
    },
    {
        path: "*",
        element: <NotFoundPage/>,
      }
  
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
