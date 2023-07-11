import Loading from "@components/Loading";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getIdToken } from "@firebaseStuff/index";
import { getOrganization } from "../apis/OrganizationApis";
import { useNavigate } from "react-router-dom";

export const CurrentElections = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getOrganization();
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Opening Time</th>
            <th>Closing Time</th>
          </tr>
        </thead>
        <tbody>
          {data.elections.map((election: any) => (
            <tr key={election.id}>
              <td>{election.id}</td>
              <td>{election.openingTime}</td>
              <td>{election.closingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
