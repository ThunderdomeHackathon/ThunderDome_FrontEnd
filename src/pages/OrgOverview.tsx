import Loading from "@components/Loading";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebaseStuff/index";

const OrgOverview = () => {
  const [data, setData] = useState<any | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const [loadingData, setLoadingData] = useState(false);

  const asyncAction = async () => {
    setLoadingData(true);
    try {
      const data = await fetch("http://localhost:8000", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };

  console.log(user);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <button onClick={asyncAction}>Fetch data</button>
      )}
      {data && <div>{data.message}</div>}
      <h1>You are Logged In</h1>
    </div>
  );
};

export default OrgOverview;
