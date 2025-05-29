import { Navbar } from "flowbite-react";
import DayCard from "../Day/Day";

const HomeHeader = () => {
  return (
    <div 
      style={{
        background: "#360033",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #0b8793, #360033)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}
    >
      <Navbar fluid rounded className="bg-transparent">
        <Navbar.Brand href="/" className="flex items-center">
          <span className="self-center text-xl sm:text-2xl font-semibold text-white">
            Trashout
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 items-center gap-4">
          <div className="hidden md:flex gap-4 items-center">
            <DayCard />
          </div>
          <Navbar.Toggle className="text-white hover:bg-gray-700 focus:ring-gray-300" />
        </div>

        <Navbar.Collapse>
          <Navbar.Link 
            href="/" 
            className="text-sm sm:text-base text-white hover:text-red-400 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
          >
            Home
          </Navbar.Link>
          <Navbar.Link 
            href="/about" 
            className="text-sm sm:text-base text-white hover:text-red-400 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
          >
            About Us
          </Navbar.Link>
          <Navbar.Link 
            href="/traveltips" 
            className="text-sm sm:text-base text-white hover:text-red-400 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
          >
            Tools
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default HomeHeader;