import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { FaviconManager } from "@shared/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import App from "./App.jsx";

export const queryClient = new QueryClient();

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FaviconManager />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
