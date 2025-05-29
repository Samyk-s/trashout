import { useRef } from "react";
import Hero from "../../components/hero/hero.page";
import NewsLetter from "../../components/newsletter/newsletter";
import TrashDetect from "../TrashDetect/TrashDetect";

const LandingPage = () => {
  const detectRef = useRef(null);

  return (
    <>
      <Hero scrollToDetect={() => detectRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <div ref={detectRef}>
        <TrashDetect />
      </div>
      <NewsLetter />
    </>
  );
};

export default LandingPage;
