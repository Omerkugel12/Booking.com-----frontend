import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
