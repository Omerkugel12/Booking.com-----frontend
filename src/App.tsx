import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";
import AuthPage from "./pages/AuthPage";
import { useState } from "react";
import FlightsPage from "./pages/FlightsPage";
import CarRentalsPage from "./pages/CarRentalsPage";
import AttractionsPage from "./pages/AttractionsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import TaxiPage from "./pages/TaxiPage";
import { useSessionStorage } from "@uidotdev/usehooks";

function App() {
  // const [email, setEmail] = useState<string>("");
  const [email, setEmail] = useSessionStorage("auth_email", "");
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            path=""
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="results"
            element={
              // <Layout>
              <ResultPage />
              // {/* </Layout> */}
            }
          />
          <Route
            path="hotel/:hotelId"
            element={
              <Layout>
                <HotelDetailsPage />
              </Layout>
            }
          />
          <Route path="stays" />
        </Route>
        <Route path="/auth">
          <Route
            index
            element={<AuthPage email={email} setEmail={setEmail} />}
          />
          <Route path="login" element={<LoginPage email={email} />} />
          <Route path="register" element={<RegisterPage email={email} />} />
        </Route>
        <Route
          path="flights"
          element={
            <Layout>
              <FlightsPage />
            </Layout>
          }
        />
        <Route
          path="car_rentals"
          element={
            <Layout>
              <CarRentalsPage />
            </Layout>
          }
        />
        <Route
          path="attractions"
          element={
            <Layout>
              <AttractionsPage />
            </Layout>
          }
        />
        <Route
          path="taxi"
          element={
            <Layout>
              <TaxiPage />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
