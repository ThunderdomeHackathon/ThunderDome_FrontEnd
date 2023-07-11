import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrgLogin from "./pages/OrgLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import OrgOverview from "./pages/OrgOverview";
import Home from "./pages/Home";
import OrgSignup from "@pages/OrgSignup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VoterLogin from "@pages/VoterLogin";
import VoterOverview from "@pages/VoterOverview";
import VoterSignup from "@pages/VoterSignup";
import ProtectedRoute2 from "@components/ProtectedRoute2";
import CreateElection from "@pages/CreateElection";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/*Organization Login and Signup*/}
          <Route path="/org-signup" element={<OrgSignup />} />
          <Route
            path="/org-login"
            element={<OrgLogin />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/org-overview" element={<OrgOverview />} />
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
            <Route path="/org-overview/create-election" element={<CreateElection />} />
          </Route>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
