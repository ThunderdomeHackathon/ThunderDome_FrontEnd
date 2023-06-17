import React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OrgLogin from "./pages/OrgLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import OrgOverview from "./pages/OrgOverview";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Routes>

        <Route path="/org-login" element={<OrgLogin setIsAuth={setIsAuth}/>} />

        <ProtectedRoute isAuth={isAuth} path="/org-overview" element={<OrgOverview/>} />

      </Routes>
    </Router>

  );
};

export default App;