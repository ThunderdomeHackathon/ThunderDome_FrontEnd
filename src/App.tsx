import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrgLogin from "./pages/OrgLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import OrgOverview from "./pages/OrgOverview";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth1 = async (isAuth: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAuth(isAuth);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/org-login"
            element={<OrgLogin handleAuth={handleAuth1} />}
          />
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="/org-overview" element={<OrgOverview />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
