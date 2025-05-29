import Lottie from "lottie-react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const Hero = ({ scrollToDetect }) => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #0b8793, #360033)",
        height: "calc(100vh - 50px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      {/* Left div */}
      <div
        style={{
          flex: 1,
          color: "white",
          textAlign: "center",
        }}
      >
        <span className="text-7xl sm:text-3xl font-light">SMART AI</span>
        
        {/* Increased margin between SMART AI and next line */}
        <p className="mx-auto mt-10"> 
          <span className="text-2xl sm:text-3xl font-light">
            to classify trash with efficiency
          </span>

          {/* Reduced margin between the two lines */}
          <p className="text-2xl md:text-base max-w-xs justify-center mx-auto mt-10">
            <span className="font-semibold">Reduce </span>
            <span className="font-light">| Reuse </span>
            <span className="font-semibold">| Recycle</span>
          </p>
        </p>

        <div className="flex items-center gap-4 justify-center mt-8">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={scrollToDetect}
          >
            Try Now
          </Button>
        </div>

        <div className="w-40 h-40 justify-center items-center mx-auto mt-10">
          <Lottie
            path="/recycle.json"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Center div with image - aligned to top */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          src="/women.png"
          alt="Recycle illustration"
          className="w-full h-auto object-contain"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Right div */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Lottie
          path="/women1.json"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Hero;
