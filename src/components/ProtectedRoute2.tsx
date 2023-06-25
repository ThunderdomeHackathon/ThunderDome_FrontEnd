import { Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebaseStuff/index";
import Loading from "./Loading";

const ProtectedRoute2 = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/voter-login");
  }

  return <Outlet />;
};

export default ProtectedRoute2;
