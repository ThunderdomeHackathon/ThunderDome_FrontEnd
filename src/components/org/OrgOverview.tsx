import { useNavigate } from "react-router-dom";
import { IOrganization } from "../../types/IOrganization";
import styles from "./OrgOverview.module.scss";
import { useEffect, useState } from "react";
import ElectionCreation from "./ElectionCreation";
import tdApi from "../../api/tdApi";
import { ICompleteElection, IElection } from "../../types/IElection";
type Props = {
  profile: IOrganization;
};

export default function OrgOverview({ profile }: Props) {
  const navigate = useNavigate();
  const [showElectionCreation, setShowElectionCreation] = useState(false);

  const [pendingElections, setPendingElections] = useState<IElection[]>([]);
  const [completeElections, setCompleteElections] = useState<
    ICompleteElection[]
  >([]);

  useEffect(() => {
    if (showElectionCreation === true) return;
    (async () => {
      try {

        const data = await tdApi.getElections();
        setPendingElections(data.pendingElections);
        setCompleteElections(data.completeElections);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showElectionCreation]);

  const handleCreateElectionClick = () => {
    setShowElectionCreation(true);
  };

  // format southafrican time, convert from utc to sast
  const formatDate = (date: Date) => {
    const utcDate = new Date(date);
    const sastDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000 + 7200000
    );
    return sastDate.toISOString().split("T")[0];
  };

  const renderContent = () => {
    if (showElectionCreation) {
      return (
        <ElectionCreation showOverview={() => setShowElectionCreation(false)} />
      );
    }
    return (
      <div>
        <div className={styles.header}>
          <h2>{profile.name}</h2>
          <button className={styles.button} onClick={handleCreateElectionClick}>
            Create election
          </button>
        </div>
        <div className={styles.completeElections}>
          <h3>Complete elections</h3>
          {completeElections.map((election) => (
            <div
              className={styles.election}
              onClick={() => navigate(`/election/${election.id}`)}
            >
              <p>{election.name}</p>
              <p>{formatDate(new Date(election.endDate))}</p>
              {election.candidates?.map((candidate) => (
                <p key={candidate}>{candidate}</p>
              ))}

              <p>Winner: {election.winner}</p>
            </div>
          ))}
        </div>
        <div className={styles.pendingElections}>
          <h3>Pending elections</h3>
          {pendingElections.map((election) => (
            <div
              className={styles.election}
              onClick={() => navigate(`/election/${election.id}`)}
            >
              <p>{election.name}</p>
              <p>{formatDate(new Date(election.endDate))}</p>
              {election.candidates?.map((candidate) => (
                <p key={candidate}>{candidate}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return <div className={styles.wrapper}>{renderContent()}</div>;
}
