import { Outlet, useNavigate } from "react-router-dom";

export type Props = {
  isAuth: boolean;
};

const ProtectedRoute = ({ isAuth }: Props) => {
  const navigate = useNavigate();
  if (!isAuth) {
    navigate("/org-login");
  }

  

  return <Outlet />;
};

export default ProtectedRoute;
