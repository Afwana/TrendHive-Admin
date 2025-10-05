import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "./store/store.js";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HeroUIProvider>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </HeroUIProvider>
  </BrowserRouter>
);
