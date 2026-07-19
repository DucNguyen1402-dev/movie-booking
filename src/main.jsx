import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/admin/store";
import {FaviconProvider} from "@components/shared";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <FaviconProvider />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
    
    </BrowserRouter>
    ,
  </Provider>,
);
