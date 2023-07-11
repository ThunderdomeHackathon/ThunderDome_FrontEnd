import Loading from "@components/Loading";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebaseStuff/index";
import { useNavigate } from "react-router-dom";
import CurrentElectionsForVoter from "@components/CurrentElectionsForVoter";

const VoterOverview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const [loadingData, setLoadingData] = useState(false);


  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigate("/voter-login");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <div>
      <h1>You are Logged In</h1>
      {loading ? (
        <Loading />
      ) : (
        CurrentElectionsForVoter()
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default VoterOverview;
