import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrgLogin from "./pages/OrgLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import OrgOverview from "./pages/OrgOverview";
import Home from "./pages/Home";
import OrgSignup from "@pages/OrgSignup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/*Organization Login and Signup*/}
          <Route path="/org-signup" element={<OrgSignup />}/>
          <Route
            path="/org-login"
            element={<OrgLogin  />}
          />
          <Route element={<ProtectedRoute  />}>
            <Route path="/org-overview" element={<OrgOverview />} />
          </Route>

          {/*Voter Login and Signup*/}

          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
