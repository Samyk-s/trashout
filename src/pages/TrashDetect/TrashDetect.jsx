import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Button from '@mui/material/Button';
const labelMap = {
  bottle: "Recyclable",
  cup: "Recyclable",
  can: "Recyclable",
  banana: "Compostable",
  apple: "Compostable",
  sandwich: "Compostable",
  "plastic bag": "Non-Recyclable",
  pizza: "Non-Recyclable",
};

const recyclingInfo = {
  Recyclable: "Place in recycling bin after rinsing if needed",
  Compostable: "Place in compost bin or organic waste",
  "Non-Recyclable": "Place in general waste bin",
  Unknown: "Check local recycling guidelines",
};

const IGNORED_CLASSES = ["person", "hand"];

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

        let boxColor = "#00FF00";
        if (recycleType === "Compostable") boxColor = "#FFA500";
        if (recycleType === "Non-Recyclable") boxColor = "#FF0000";
        if (recycleType === "Unknown") boxColor = "#888888";

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
          <Button variant="contained"             onClick={() => setIsWebcamActive(true)}
>Open webcam</Button>
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
                backgroundColor: 
                  confirmedItem.type === "Recyclable" ? "rgba(0, 255, 0, 0.2)" :
                  confirmedItem.type === "Compostable" ? "rgba(255, 165, 0, 0.2)" :
                  confirmedItem.type === "Non-Recyclable" ? "rgba(255, 0, 0, 0.2)" :
                  "rgba(136, 136, 136, 0.2)",
                backdropFilter: "blur(5px)",
              }}
            >
              <p className="text-lg">
                <span className="font-semibold">Object:</span> {confirmedItem.class}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Type:</span>{" "}
                <span
                  style={{
                    color:
                      confirmedItem.type === "Recyclable" ? "#00FF00" :
                      confirmedItem.type === "Compostable" ? "#FFA500" :
                      confirmedItem.type === "Non-Recyclable" ? "#FF0000" :
                      "#888888",
                  }}
                >
                  {confirmedItem.type}
                </span>
              </p>
            </div>

            <h3 className="text-xl font-bold mt-6">What to do:</h3>
            <div 
              className="p-4 rounded-lg shadow"
              style={{
                backgroundColor: 
                  confirmedItem.type === "Recyclable" ? "rgba(0, 255, 0, 0.2)" :
                  confirmedItem.type === "Compostable" ? "rgba(255, 165, 0, 0.2)" :
                  confirmedItem.type === "Non-Recyclable" ? "rgba(255, 0, 0, 0.2)" :
                  "rgba(136, 136, 136, 0.2)",
                backdropFilter: "blur(5px)",
              }}
            >
              <p className="text-lg">{recyclingInfo[confirmedItem.type]}</p>
              {confirmedItem.type === "Recyclable" && (
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Rinse containers to remove food residue</li>
                  <li>Remove caps/lids if required in your area</li>
                  <li>Flatten containers to save space</li>
                </ul>
              )}
              {confirmedItem.type === "Compostable" && (
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Remove any non-compostable packaging</li>
                  <li>Cut large items into smaller pieces</li>
                  <li>Don't compost meat/dairy in home compost</li>
                </ul>
              )}
              {confirmedItem.type === "Non-Recyclable" && (
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Consider if the item can be reused</li>
                  <li>Look for specialty recycling programs</li>
                  <li>Reduce use of similar items in future</li>
                </ul>
              )}
            </div>
          </div>
        ) : detectedItem ? (
          <div className="text-center p-8">
            <p className="text-lg">
              Detected: {detectedItem.class} ({detectedItem.type})
            </p>
            <p className="mt-2">Press "Confirm" to see recycling instructions</p>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Recycling Assistant</h2>
            <p className="text-lg">
              Point your camera at a waste item to identify how to properly dispose of it.
            </p>
            <div className="mt-6 p-4 bg-opacity-20 rounded-lg">
              <p className="font-semibold">Tip:</p>
              <p>Hold the item steady in the frame for better detection</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashDetect;