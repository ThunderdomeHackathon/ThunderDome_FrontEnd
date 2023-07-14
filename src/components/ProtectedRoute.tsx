import { Outlet, useNavigate } from "react-router-dom";

import Loading from "./Loading";
import { auth } from "@firebaseStuff/index";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/organization-login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
