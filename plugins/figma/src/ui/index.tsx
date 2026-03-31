import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/plugin.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
