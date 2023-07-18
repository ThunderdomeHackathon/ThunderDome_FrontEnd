import { isEmpty, isNull, isUndefined } from "lodash";
import { useEffect, useState } from "react";

import { Candidate } from "../../interfaces/Candidate";
import { Election } from "../../interfaces/Election";
import Loading from "@components/Loading";
import ReactModal from "react-modal";
import { getElectionsForOrganization } from "../../api/OrganizationApi";
import { useNavigate } from "react-router-dom";
import "../../styles/OrgOverview.css";

export const ElectionsForOrganization = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [elections, setElections] = useState<Election[] | null>(null);
  const [electionModalIsVisible, setElectionModalIsVisible] =
    useState<boolean>(false);
  const [clickedElection, setClickedElection] = useState<Election | null>(null);

  useEffect(() => {
    const getElections = async () => {
      try {
        const { elections } = await getElectionsForOrganization();
        setElections(elections);
      } catch (error) {
        setError("Something went wrong with getting your elections.");
        console.log(error);
      }
    };
    getElections();
    setLoading(false);
  }, []);

  const handleViewElectionDetailsClick = (electionId: string) => {
    const clickedElection = elections?.find(
      (election) => election.id === electionId
    );
    if (!isUndefined(clickedElection)) {
      setClickedElection(clickedElection);
      setElectionModalIsVisible(true);
    }
  };

  const ElectionForOrganization = () => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{clickedElection?.name}</td>
              <td>{clickedElection?.openingTime.toISOString()}</td>
              <td>{clickedElection?.closingTime.toISOString()}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Candidates</th>
              <th>Campaign Message</th>
              <th>Number of Votes</th>
            </tr>
          </thead>
          <tbody>
            {clickedElection?.candidates.map((candidate: Candidate) => {
              const numberOfVotes = Math.floor(Math.random() * 100).toString();
              return (
                <tr>
                  <td>{candidate.name}</td>
                  <td>{candidate.campaignMessage}</td>
                  <td>{numberOfVotes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  if (!isNull(error)) {
    return <text>{error}</text>;
  }
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (isNull(elections) || isEmpty(elections)) {
    return <text>You have not yet created any elections.</text>;
  }

  return (
    <div className="electionsforOrgs">
      <table>
        <thead>
          <tr>
            <th>Election Name</th>
            <th>Opening Time</th>
            <th>Closing Time</th>
            <th>Click here for more details</th>
          </tr>
        </thead>
        <tbody>
          {elections.map((election: Election) => (
            <tr>
              <td>{election.name}</td>
              <td>{election.openingTime.toISOString()}</td>
              <td>{election.closingTime.toISOString()}</td>
              <td>
                <button
                  onClick={() => handleViewElectionDetailsClick(election.id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactModal
        isOpen={electionModalIsVisible}
        onRequestClose={() => setElectionModalIsVisible(false)}
      >
        {ElectionForOrganization()}
      </ReactModal>
    </div>
  );
};

export default ElectionsForOrganization;
