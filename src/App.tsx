import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreateElection from "@pages/CreateElection";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OrgLogin from "./pages/OrganizationLogin";
import OrganizationOverview from "./pages/OrganizationOverview";
import OrganizationSignup from "@pages/OrganizationSignup";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import VoterLogin from "@pages/VoterLogin";
import VoterOverview from "@pages/VoterOverview";
import VoterSignup from "@pages/VoterSignup";
import Overview from "@pages/Overview";
import AboutUs from "@pages/AboutUs";
import UnprotectedRoute from "@components/UnprotectedRoute";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<UnprotectedRoute />}>
            <Route path="/organization-signup" element={<OrganizationSignup />} />
            <Route path="/organization-login" element={<OrgLogin />} />
            <Route path="/voter-signup" element={<VoterSignup />} />
            <Route path="/voter-login" element={<VoterLogin />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/overview" element={<Overview />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
