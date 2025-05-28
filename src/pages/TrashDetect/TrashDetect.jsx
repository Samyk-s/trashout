import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

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

  // Load model once
  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log("COCO-SSD model loaded");
    };
    loadModel();
  }, []);

  // Detect and draw bounding boxes
  const detectFrame = async () => {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);

      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      // Clear previous drawings
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      let currentDetection = null;
      const now = Date.now();

      predictions.forEach((prediction) => {
        if (IGNORED_CLASSES.includes(prediction.class)) return;

        // Draw bounding box
        const [x, y, width, height] = prediction.bbox;
        const recycleType = labelMap[prediction.class] || "Unknown";
        
        // Set different colors based on recycling type
        let boxColor = "#00FF00"; // Default green
        if (recycleType === "Compostable") boxColor = "#FFA500"; // Orange
        if (recycleType === "Non-Recyclable") boxColor = "#FF0000"; // Red
        if (recycleType === "Unknown") boxColor = "#888888"; // Gray

        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 3;
        ctx.font = "18px Arial";
        ctx.fillStyle = boxColor;
        ctx.strokeRect(x, y, width, height);

        // Text: class + recycling type
        const text = `${prediction.class} (${recycleType})`;

        // Background for text for readability
        const textWidth = ctx.measureText(text).width;
        const textHeight = 20;
        ctx.fillRect(x, y - textHeight, textWidth + 10, textHeight);

        // Text color
        ctx.fillStyle = "#000000";
        ctx.fillText(text, x + 5, y - 5);

        // Update current detection (use the first valid one)
        if (!currentDetection && prediction.score > 0.7) {
          currentDetection = {
            class: prediction.class,
            type: recycleType,
            timestamp: now
          };
        }
      });

      // Only update detected item if we have a new high-confidence detection
      if (currentDetection && currentDetection.timestamp > lastDetectionTime) {
        setDetectedItem(currentDetection);
        setLastDetectionTime(currentDetection.timestamp);
      }
    }
    requestAnimationFrame(detectFrame);
  };

  useEffect(() => {
    if (model) {
      detectFrame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  const handleConfirm = () => {
    if (detectedItem) {
      setConfirmedItem(detectedItem);
    }
  };

  const handleClear = () => {
    setConfirmedItem(null);
    setDetectedItem(null);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4 gap-6 min-h-screen">
      {/* Left side - Webcam and detection */}
      <div className="w-full sm:w-1/2 flex flex-col items-center">
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

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleConfirm}
            disabled={!detectedItem}
            className={`px-6 py-2 rounded-lg font-medium ${detectedItem ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Confirm
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Right side - Recycling information */}
      <div className="w-full sm:w-1/2 p-6 bg-gray-50 rounded-lg">
        {confirmedItem ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Detected Item:</h2>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-lg">
                <span className="font-semibold">Object:</span> {confirmedItem.class}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Type:</span>{" "}
                <span className={
                  confirmedItem.type === "Recyclable" ? "text-green-600" :
                  confirmedItem.type === "Compostable" ? "text-orange-600" :
                  confirmedItem.type === "Non-Recyclable" ? "text-red-600" : "text-gray-600"
                }>
                  {confirmedItem.type}
                </span>
              </p>
            </div>

            <h3 className="text-xl font-bold mt-6">What to do:</h3>
            <div className="p-4 bg-white rounded-lg shadow">
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
            <p className="text-lg">Detected: {detectedItem.class} ({detectedItem.type})</p>
            <p className="mt-2">Press "Confirm" to see recycling instructions</p>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Recycling Assistant</h2>
            <p className="text-lg">Point your camera at a waste item to identify how to properly dispose of it.</p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
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