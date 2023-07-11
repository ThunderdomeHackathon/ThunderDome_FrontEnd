import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/routingStuff/ProtectedRoute";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import UnprotectedRoute from "./components/routingStuff/UnprotectedRoute";
import "./styles/global.scss";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UnprotectedRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
