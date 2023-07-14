import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreateElection from "@pages/CreateElection";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OrgLogin from "./pages/OrganizationLogin";
import OrganizationOverview from "./pages/OrganizationOverview";
import OrganizationSignup from "@pages/OrganizationSignup";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRoute2 from "@components/ProtectedRoute2";
import React from "react";
import VoterLogin from "@pages/VoterLogin";
import VoterOverview from "@pages/VoterOverview";
import VoterSignup from "@pages/VoterSignup";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/*Organization Login and Signup*/}
          <Route path="/organization-signup" element={<OrganizationSignup />} />
          <Route
            path="/organization-login"
            element={<OrgLogin />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/organization-overview" element={<OrganizationOverview />} />
          </Route>

          {/*Voter Login and Signup*/}
          <Route path="/voter-signup" element={<VoterSignup />} />
          <Route
            path="/voter-login"
            element={<VoterLogin />}
          />
          <Route element={<ProtectedRoute2 />}>
            <Route path="/voter-overview" element={<VoterOverview />} />
          </Route>

          {/*Create election*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/organization-overview/create-election" element={<CreateElection />} />
          </Route>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
