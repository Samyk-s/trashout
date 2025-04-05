import Hero from "../../components/hero/hero.page";
import HomeFeature from "../../components/homefeature/homefeature";
import NewsLetter from "../../components/newsletter/newsletter";
import ServicesSection from "../../components/service/service";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HomeFeature />
      <NewsLetter />
    </>
  );
};
export default LandingPage;
