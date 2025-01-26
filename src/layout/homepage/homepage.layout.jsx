import HomeFooter from "../../components/homefooter/homefooter";
import HomeHeader from "../../components/homeheader/homeheader";
import { Outlet } from "react-router-dom";

const HomePageLayout = () => {
  return (
    <>
      <HomeHeader />

      <Outlet />

      <HomeFooter />
    </>
  );
};
export default HomePageLayout;
