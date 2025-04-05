import { Navbar } from "flowbite-react";

import DayCard from "../Day/Day";

const HomeHeader = () => {
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="/" className="flex items-center">
          <img
            src="/logo.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center text-xl sm:text-2xl font-semibold dark:text-white">
            Travel Vlog
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 items-center gap-4">
          <div className="hidden md:flex gap-4 items-center">
            <DayCard />
          </div>
        </div>

        <Navbar.Collapse>
          <Navbar.Link href="/" className="text-sm sm:text-base">
            Home
          </Navbar.Link>
          <Navbar.Link href="/destinations" className="text-sm sm:text-base">
            Destinations
          </Navbar.Link>
          <Navbar.Link href="/TravelTips" className="text-sm sm:text-base">
            Travel Tools
          </Navbar.Link>
          
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default HomeHeader;
