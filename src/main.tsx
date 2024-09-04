import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { ReservationProvider } from "./context/ReservationContext.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
// import "rsuite/dist/rsuite.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReservationProvider>
        <AuthProvider>
          <SearchProvider>
            <App />
            <Toaster />
          </SearchProvider>
        </AuthProvider>
      </ReservationProvider>
    </BrowserRouter>
  </StrictMode>
);
