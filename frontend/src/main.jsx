import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import Appcontextprovider from "./context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Appcontextprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Appcontextprovider>
    </ClerkProvider>
  </StrictMode>,
);
