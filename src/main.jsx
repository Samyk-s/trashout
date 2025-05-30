import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routing from "./routing/routing.config.jsx";
import "flowbite/dist/flowbite.min.css";
import { Analytics } from "@vercel/analytics/next";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Add the Analytics component here so it tracks visits across the entire app */}
    <Analytics />
    <Routing />
  </StrictMode>
);
