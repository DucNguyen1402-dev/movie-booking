import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { FaviconManager } from "@managers/shared";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import { queryClient } from "./lib/react-query";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FaviconManager />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
