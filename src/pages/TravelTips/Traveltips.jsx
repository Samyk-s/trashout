import "leaflet/dist/leaflet.css";
import MyMaps from "../../components/map/map";
import CurrencyExchange from "../../components/CurrencyExchange";
import WeatherBox from "../../components/weather/weather";
const TravelQA = () => {
  const questions = [
    {
      q: "Do I need a visa to visit Nepal?",
      a: "Yes, most travelers need a visa. You can get it on arrival at the airport.",
    },
    {
      q: "What is the best time to visit Nepal?",
      a: "October to December is the best time with clear skies and pleasant weather.",
    },
    {
      q: "Is Nepal safe for tourists?",
      a: "Yes, Nepal is generally safe for travelers. However, always take common precautions.",
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Travel Q&A</h2>
      {questions.map((item, index) => (
        <details key={index} className="mb-2 bg-gray-100 p-2 rounded-lg">
          <summary className="font-semibold cursor-pointer">{item.q}</summary>
          <p className="text-gray-600 mt-1">{item.a}</p>
        </details>
      ))}
    </div>
  );
};

// 📌 Main TravelTips Component
const TravelTips = () => {
  return (
    <div className="w-full p-4 space-y-6">
      {/* Grid layout for Currency Exchange & Weather */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyExchange />
        <WeatherBox />
      
      </div>
      <MyMaps />
     
      <TravelQA />
    </div>
  );
};

export default TravelTips;
