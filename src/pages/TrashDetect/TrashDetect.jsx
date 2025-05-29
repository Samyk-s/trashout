import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Button from '@mui/material/Button';

const labelMap = {
  // Recyclable items
  bottle: "Recyclable",
  cup: "Recyclable",
  can: "Recyclable",
  fork: "Recyclable",
  knife: "Recyclable",
  spoon: "Recyclable",
  bowl: "Recyclable",
  plate: "Recyclable",
  "wine glass": "Recyclable",
  cardboard: "Recyclable",
  newspaper: "Recyclable",
  book: "Recyclable",
  "paper towel": "Recyclable",
  envelope: "Recyclable",
  "plastic container": "Recyclable",
  "aluminum foil": "Recyclable",
  jar: "Recyclable",
  "glass bottle": "Recyclable",
  "metal can": "Recyclable",
  "plastic bottle": "Recyclable",
  
  // Compostable items
  banana: "Compostable",
  apple: "Compostable",
  orange: "Compostable",
  sandwich: "Compostable",
  broccoli: "Compostable",
  carrot: "Compostable",
  "hot dog": "Compostable",
  pizza: "Compostable",
  donut: "Compostable",
  cake: "Compostable",
  egg: "Compostable",
  "french fries": "Compostable",
  salad: "Compostable",
  bread: "Compostable",
  tea: "Compostable",
  coffee: "Compostable",
  leaves: "Compostable",
  flowers: "Compostable",
  grass: "Compostable",
  
  // Non-Recyclable items
  "plastic bag": "Non-Recyclable",
  "chip bag": "Non-Recyclable",
  "styrofoam cup": "Non-Recyclable",
  "disposable diaper": "Non-Recyclable",
  "paper cup": "Non-Recyclable",
  "wax paper": "Non-Recyclable",
  "painted wood": "Non-Recyclable",
  "ceramic plate": "Non-Recyclable",
  "light bulb": "Non-Recyclable",
  mirror: "Non-Recyclable",
  "window glass": "Non-Recyclable",
  "pizza box": "Non-Recyclable",
  "greasy paper": "Non-Recyclable",
  "photograph": "Non-Recyclable",
  "carbon paper": "Non-Recyclable",
  
  // Electronic Waste
  "cell phone": "Electronic Waste",
  laptop: "Electronic Waste",
  tv: "Electronic Waste",
  keyboard: "Electronic Waste",
  mouse: "Electronic Waste",
  remote: "Electronic Waste",
  "video game": "Electronic Waste",
  tablet: "Electronic Waste",
  headphones: "Electronic Waste",
  battery: "Electronic Waste",
  charger: "Electronic Waste",
  cables: "Electronic Waste",
  
  // Hazardous Waste
  "aerosol can": "Hazardous Waste",
  "paint can": "Hazardous Waste",
  "chemical bottle": "Hazardous Waste",
  "motor oil": "Hazardous Waste",
  "thermometer": "Hazardous Waste",
  "fluorescent bulb": "Hazardous Waste",
  "medicine bottle": "Hazardous Waste",
  "nail polish": "Hazardous Waste",
  "pesticide": "Hazardous Waste",
  
  // Special Handling
  clothing: "Textile Recycling",
  shoes: "Textile Recycling",
  mattress: "Bulk Item",
  furniture: "Bulk Item",
  "wood pallet": "Wood Recycling",
  tires: "Tire Recycling",
  "ink cartridge": "Office Supply Recycling",
  "printer cartridge": "Office Supply Recycling"
};

const recyclingInfo = {
  Recyclable: {
    instruction: "Place in recycling bin after rinsing if needed",
    tips: [
      "Rinse containers to remove food residue",
      "Remove caps/lids if required in your area",
      "Flatten containers to save space",
      "Check local guidelines for plastic numbers",
      "Keep paper and cardboard dry and clean",
      "Separate different materials when possible"
    ],
    examples: [
      "Plastic bottles and containers",
      "Glass bottles and jars",
      "Aluminum and steel cans",
      "Clean paper and cardboard",
      "Milk and juice cartons"
    ]
  },
  Compostable: {
    instruction: "Place in compost bin or organic waste",
    tips: [
      "Remove any non-compostable packaging",
      "Cut large items into smaller pieces",
      "Don't compost meat/dairy in home compost",
      "Balance greens (food) and browns (leaves, paper)",
      "Avoid composting diseased plants",
      "Turn your compost pile regularly"
    ],
    examples: [
      "Fruit and vegetable scraps",
      "Eggshells",
      "Coffee grounds and filters",
      "Tea bags (check for plastic)",
      "Yard trimmings",
      "Bread and grains"
    ]
  },
  "Non-Recyclable": {
    instruction: "Place in general waste bin",
    tips: [
      "Consider if the item can be reused",
      "Look for specialty recycling programs",
      "Reduce use of similar items in future",
      "Choose products with less packaging",
      "Check for local take-back programs",
      "Break down large items properly"
    ],
    examples: [
      "Plastic bags and wrappers",
      "Styrofoam containers",
      "Ceramics and pyrex",
      "Disposable diapers",
      "Wax-coated paper products",
      "Broken glassware"
    ]
  },
  "Electronic Waste": {
    instruction: "Take to e-waste recycling facility",
    tips: [
      "Remove batteries if possible",
      "Wipe personal data from devices",
      "Check for manufacturer take-back programs",
      "Donate working electronics",
      "Look for certified e-waste recyclers",
      "Never throw in regular trash"
    ],
    examples: [
      "Computers and laptops",
      "Cell phones and tablets",
      "TVs and monitors",
      "Printers and scanners",
      "Small appliances",
      "Chargers and cables"
    ]
  },
  "Hazardous Waste": {
    instruction: "Take to hazardous waste collection site",
    tips: [
      "Keep in original containers if possible",
      "Don't mix different chemicals",
      "Store in cool, dry place until disposal",
      "Never pour down drains or toilets",
      "Check for community collection days",
      "Look for alternative non-toxic products"
    ],
    examples: [
      "Batteries",
      "Paint and solvents",
      "Pesticides and herbicides",
      "Cleaning chemicals",
      "Fluorescent bulbs",
      "Medical waste"
    ],
  },
  "Textile Recycling": {
    instruction: "Donate usable items or use textile recycling bins",
    tips: [
      "Wash items before donating",
      "Check for local clothing drives",
      "Repurpose worn items as rags",
      "Look for specialty fabric recyclers",
      "Separate by material type when possible",
      "Remove non-fabric components"
    ],
    examples: [
      "Clothing and shoes",
      "Towels and linens",
      "Blankets and curtains",
      "Fabric scraps",
      "Belts and purses",
      "Stuffed animals"
    ]
  },
  "Bulk Item": {
    instruction: "Arrange for special pickup or take to disposal facility",
    tips: [
      "Check municipal bulk pickup schedules",
      "Disassemble large items when possible",
      "Donate usable furniture",
      "Look for scrap metal recyclers",
      "Separate materials for recycling",
      "Protect items from weather before pickup"
    ],
    examples: [
      "Furniture",
      "Mattresses",
      "Appliances",
      "Large toys",
      "Exercise equipment",
      "Carpeting"
    ]
  },
  Unknown: {
    instruction: "Check local recycling guidelines",
    tips: [
      "Search your municipal waste website",
      "Use recycling lookup tools",
      "When in doubt, throw it out",
      "Contact local waste management",
      "Look for product-specific recycling",
      "Consider the item's material composition"
    ],
    examples: [
      "Mixed material items",
      "New packaging types",
      "Specialty products",
      "Items with food contamination",
      "Degradable/bioplastic items",
      "Unusual materials"
    ]
  }
};

const IGNORED_CLASSES = ["person", "hand", "clock", "teddy bear", "umbrella"];

const TrashDetect = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedItem, setDetectedItem] = useState(null);
  const [confirmedItem, setConfirmedItem] = useState(null);
  const [lastDetectionTime, setLastDetectionTime] = useState(0);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log("COCO-SSD model loaded");
    };
    loadModel();
  }, []);

  const detectFrame = async () => {
    if (
      model &&
      isWebcamActive &&
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);

      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      let currentDetection = null;
      const now = Date.now();

      predictions.forEach((prediction) => {
        if (IGNORED_CLASSES.includes(prediction.class)) return;

        const [x, y, width, height] = prediction.bbox;
        const recycleType = labelMap[prediction.class] || "Unknown";

        let boxColor = "#00FF00"; // Green for Recyclable
        if (recycleType === "Compostable") boxColor = "#FFA500"; // Orange
        if (recycleType === "Non-Recyclable") boxColor = "#FF0000"; // Red
        if (recycleType === "Electronic Waste") boxColor = "#800080"; // Purple
        if (recycleType === "Hazardous Waste") boxColor = "#FF00FF"; // Magenta
        if (recycleType === "Textile Recycling") boxColor = "#00FFFF"; // Cyan
        if (recycleType === "Bulk Item") boxColor = "#A52A2A"; // Brown
        if (recycleType === "Unknown") boxColor = "#888888"; // Gray

        // Draw bounding box
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw text background
        const text = `${prediction.class} (${recycleType})`;
        const textWidth = ctx.measureText(text).width;
        const textHeight = 20;
        ctx.fillStyle = boxColor;
        ctx.fillRect(x, y - textHeight, textWidth + 10, textHeight);

        // Draw text
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(text, x + 5, y - 5);

        if (!currentDetection && prediction.score > 0.7) {
          currentDetection = {
            class: prediction.class,
            type: recycleType,
            timestamp: now,
          };
        }
      });

      if (currentDetection && currentDetection.timestamp > lastDetectionTime) {
        setDetectedItem(currentDetection);
        setLastDetectionTime(currentDetection.timestamp);
      }
    }

    if (isWebcamActive) {
      requestAnimationFrame(detectFrame);
    }
  };

  useEffect(() => {
    if (model && isWebcamActive) {
      detectFrame();
    }
  }, [model, isWebcamActive]);

  const handleConfirm = () => {
    if (detectedItem) {
      setConfirmedItem(detectedItem);
    }
  };

  const handleClear = () => {
    setDetectedItem(null);
    setConfirmedItem(null);
  };

  const handleCloseWebcam = () => {
    setIsWebcamActive(false);
    setDetectedItem(null);
    setConfirmedItem(null);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "Recyclable": return "#00FF00";
      case "Compostable": return "#FFA500";
      case "Non-Recyclable": return "#FF0000";
      case "Electronic Waste": return "#800080";
      case "Hazardous Waste": return "#FF00FF";
      case "Textile Recycling": return "#00FFFF";
      case "Bulk Item": return "#A52A2A";
      default: return "#888888";
    }
  };

  return (
    <div 
      className="flex flex-col sm:flex-row items-center justify-center p-4 gap-6 min-h-screen"
      style={{
        background: "#360033",
        background: "-webkit-linear-gradient(to right, #0b8793, #360033)",
        background: "linear-gradient(to right, #0b8793, #360033)",
      }}
    >
      {/* Left side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center">
        {!isWebcamActive ? (
          <Button 
            variant="contained" 
            onClick={() => setIsWebcamActive(true)}
            style={{ backgroundColor: '#0b8793', color: 'white' }}
          >
            Open Webcam
          </Button>
        ) : (
          <>
            <div style={{ position: "relative", width: 640, height: 480 }}>
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={true}
                videoConstraints={{ facingMode: "environment", width: 640, height: 480 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 640,
                  height: 480,
                  borderRadius: 12,
                  zIndex: 1,
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 640,
                  height: 480,
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            </div>

            <div className="mt-4 flex gap-4 flex-wrap">
              <button
                onClick={handleConfirm}
                disabled={!detectedItem}
                className={`px-6 py-2 rounded-lg font-medium ${
                  detectedItem
                    ? "bg-white text-[#0b8793] hover:bg-gray-100"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-white text-[#0b8793] hover:bg-gray-100 rounded-lg font-medium"
              >
                Clear
              </button>
              <button
                onClick={handleCloseWebcam}
                className="px-6 py-2 bg-white text-red-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Close Webcam
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="w-full sm:w-1/2 p-6 bg-opacity-20 backdrop-blur-sm rounded-lg text-white">
        {confirmedItem ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Detected Item:</h2>
            <div 
              className="p-4 rounded-lg shadow"
              style={{
                backgroundColor: `rgba(${hexToRgb(getTypeColor(confirmedItem.type))}, 0.2)`,
                backdropFilter: "blur(5px)",
              }}
            >
              <p className="text-lg">
                <span className="font-semibold">Object:</span> {confirmedItem.class}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Type:</span>{" "}
                <span style={{ color: getTypeColor(confirmedItem.type) }}>
                  {confirmedItem.type}
                </span>
              </p>
            </div>

            <h3 className="text-xl font-bold mt-6">What to do:</h3>
            <div 
              className="p-4 rounded-lg shadow"
              style={{
                backgroundColor: `rgba(${hexToRgb(getTypeColor(confirmedItem.type))}, 0.2)`,
                backdropFilter: "blur(5px)",
              }}
            >
              <p className="text-lg font-semibold">{recyclingInfo[confirmedItem.type]?.instruction}</p>
              
              <h4 className="font-semibold mt-4">Tips:</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {recyclingInfo[confirmedItem.type]?.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              
              <h4 className="font-semibold mt-4">Common Examples:</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {recyclingInfo[confirmedItem.type]?.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : detectedItem ? (
          <div className="text-center p-8">
            <p className="text-lg">
              Detected: {detectedItem.class} (<span style={{ color: getTypeColor(detectedItem.type) }}>{detectedItem.type}</span>)
            </p>
            <p className="mt-2">Press "Confirm" to see detailed disposal instructions</p>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Waste Classification Assistant</h2>
            <p className="text-lg">
              Point your camera at a waste item to identify how to properly dispose of it.
            </p>
            <div className="mt-6 p-4 bg-opacity-20 rounded-lg">
              <p className="font-semibold">Tip:</p>
              <p>Hold the item steady in good lighting for better detection</p>
              <p className="mt-2">Works best with common household waste items</p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold text-green-400">Recyclable</h3>
                <p className="text-sm">Bottles, cans, paper, cardboard</p>
              </div>
              <div>
                <h3 className="font-semibold text-orange-400">Compostable</h3>
                <p className="text-sm">Food scraps, yard waste</p>
              </div>
              <div>
                <h3 className="font-semibold text-red-400">Non-Recyclable</h3>
                <p className="text-sm">Plastic bags, styrofoam</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-400">E-Waste</h3>
                <p className="text-sm">Electronics, batteries</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

export default TrashDetect;