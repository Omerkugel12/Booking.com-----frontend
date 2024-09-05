import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { ReservationProvider } from "./context/ReservationContext.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Use the correct Vite environment variable
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  console.error("Google Client ID is missing!", GOOGLE_CLIENT_ID);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
    </GoogleOAuthProvider>
  </StrictMode>
);
