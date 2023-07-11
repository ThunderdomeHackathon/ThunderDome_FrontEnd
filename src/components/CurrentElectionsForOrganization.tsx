import Loading from "@components/Loading";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getIdToken } from "@firebaseStuff/index";
import { getCurrentElections } from "../apis/ElectionApis";
import { useNavigate } from "react-router-dom";

export const CurrentElections = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCurrentElections();
        setData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateElection = () => {
    navigate("/org-overview/create-election");
  };

  const renderElectionsTable = () => {
    if (!data || !data.elections || data.elections.length === 0) {
      return (
        <button onClick={handleCreateElection}>Create your first election</button>
      );
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Election Name</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
            </tr>
          </thead>
          <tbody>
            {data.elections.map((election: any) => (
              // need to use opening_time NOT openingTime
              <tr key={election.id}>
                <td>{election.name}</td>
                <td>{election.opening_time}</td>
                <td>{election.closing_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleCreateElection}>Create an election</button>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {renderElectionsTable()}
        </>
      )}
    </div>
  );
};

export default CurrentElections;
