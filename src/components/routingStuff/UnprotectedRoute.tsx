import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseStuff/index";
import Loading from "../utility/Loading";
import { Outlet, useNavigate } from "react-router-dom";

export default function UnprotectedRoute() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }


  return <Outlet />;
}
