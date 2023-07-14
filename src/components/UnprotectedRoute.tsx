import { auth } from "@firebaseStuff/index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";
import { Outlet, useNavigate } from "react-router-dom";

export default function UnprotectedRoute() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    navigate("/overview");
  }

  return <Outlet />;
}
