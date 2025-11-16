import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
