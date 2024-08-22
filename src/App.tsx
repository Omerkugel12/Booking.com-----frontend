import ResultHotelCard from "./components/self-made/ResultHotelCard";
import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import { Hotel } from "./models/Hotel.model";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const hotel1: Hotel = {
    _id: "1",
    name: "Hotel 1",
    type: "hotel",
    city: "New York",
    address: "456 Elm St",
    distance: "2KM",
    photos: ["https://example.com/hotel1.jpg"],
    title: "Hotel 1",
    desc: "This is a great hotel located in the heart of the city.",
    rating: 4.8,
    rooms: ["Room 1", "Room 2", "Room 3"],
    cheapestPrice: 100,
    featured: true,
  };

  return (
    <>
      <Routes>
        <Route path="/stays">
          <Route
            path=""
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route
            path="register"
            element={
              <Layout>
                <RegisterPage />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
