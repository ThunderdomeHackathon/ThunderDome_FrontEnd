import { Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseStuff/index";
import Loading from "../utility/Loading";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
