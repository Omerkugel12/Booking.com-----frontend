import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import { Hotel } from "./models/Hotel.model";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";

function App() {

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
        <Route
          path="/results"
          element={
            <Layout>
              <ResultPage />
            </Layout>
          }
        />
        ;{" "}
      </Routes>
    </>
  );
}

export default App;
