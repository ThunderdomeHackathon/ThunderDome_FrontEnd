import Loading from "@components/Loading";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getIdToken } from "@firebaseStuff/index";
import { useNavigate } from "react-router-dom";
import { CurrentElections } from "@components/CurrentElectionsForOrganization";

const OrgOverview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const [loadingData, setLoadingData] = useState(false);
  let fetchData = null;

  useEffect(() => {
    fetchData = async () => {
      setLoadingData(true);
      try {
        const authToken = await getIdToken();
        const response = await fetch("http://localhost:8000/organizations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingData(false);
      }
    }
    fetchData();
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigate("/org-login");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : CurrentElections()}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default OrgOverview;
