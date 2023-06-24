import Loading from "@components/Loading";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const OrgOverview = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const asyncAction = async () => {
    setLoading(true);
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
    }
    console.log(data);
    setLoading(false);
  };

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
