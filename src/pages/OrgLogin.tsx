import Loading from "@components/Loading";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  handleAuth: (isAuth: boolean) => Promise<void>;
}

const OrgLogin = ({ handleAuth }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await handleAuth(true);
    setLoading(false);
    navigate("/org-overview");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <button onClick={() => handleLogin()}>Login</button>
      )}
    </div>
  );
};

export default OrgLogin;
