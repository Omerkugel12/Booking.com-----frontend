import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";
import AuthPage from "./pages/AuthPage";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="" element={<HomePage />} />
          <Route
            path="results"
            element={
              <Layout>
                <ResultPage />
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
        ;{" "}
      </Routes>
    </>
  );
}

export default App;
