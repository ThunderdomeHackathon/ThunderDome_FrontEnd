import React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OrgLogin from "./pages/OrgLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import OrgOverview from "./pages/OrgOverview";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/org-login" element={<OrgLogin setIsAuth={setIsAuth}/>} />
          <ProtectedRoute isAuth={isAuth} path="/org-overview" element={<OrgOverview/>} />
        </Routes>
      <Footer />
    </Router>

  );
};

export default App;