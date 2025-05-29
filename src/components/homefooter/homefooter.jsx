import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const HomeFooter = () => {
  return (
    <Footer container style={{
      background: "#360033",
      background: "-webkit-linear-gradient(to right, #0b8793, #360033)",
      background: "linear-gradient(to right, #0b8793, #360033)",
    }}>
      <div className="w-full">
        <div className="w-full px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright 
            href="#" 
            by="EcoScan™" 
            year={new Date().getFullYear()} 
            className="text-white"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-white hover:text-gray-300" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-white hover:text-gray-300" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-white hover:text-gray-300" />
            <Footer.Icon href="#" icon={BsGithub} className="text-white hover:text-gray-300" />
            <Footer.Icon href="#" icon={BsDribbble} className="text-white hover:text-gray-300" />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default HomeFooter;