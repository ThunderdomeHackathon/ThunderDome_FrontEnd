import { useState } from "react";
import styles from "./ElectionCreation.module.scss";
import { CircularProgress } from "@mui/material";
import tdApi from "../../api/tdApi";

type Props = {
  showOverview: () => void;
};
export default function ElectionCreation({ showOverview }: Props) {
  const [electionName, setElectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<string[]>(["", ""]);
  const [electionDate, setElectionDate] = useState<Date>(new Date());
  const [error, setError] = useState(false);
  const [electionCreated, setElectionCreated] = useState(false);

  const handleElectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElectionName(e.target.value);
  };

  const deleteCandidate = (index: number) => {
    // make a new array of candidates without the candidate at the specified index
    const newCandidates = candidates.filter((candidate, i) => i !== index);
    setCandidates(newCandidates);
  };

  const addCandidate = () => {
    setCandidates([...candidates, ""]);
  };

  const handleElectionDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElectionDate(new Date(e.target.value));
  };

  const createElection = async () => {
    if (electionName === "") {
      return;
    }
    if (electionDate === null) {
      return;
    }
    if (candidates.length < 2) {
      return;
    }
    setError(false);
    setLoading(true);
    try {
      await tdApi.createElection(
        electionName,
        electionDate,
        candidates.filter((candidate) => candidate !== "")
      );
      setElectionCreated(true);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // function to convert Date to "YYYY-MM-DD" format
  const formatDate = (date: Date) => {
    const d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  const renderContent = () => {
    if (electionCreated) {
      return (
        <p className={styles.success}>
          Election successfully created. Go back to overview to view it under
          "Pending".
        </p>
      );
    }

    return (
      <>
        <h2>Create election</h2>
        <form>
          <div className={styles.inputWrapper}>
            <label htmlFor="electionName">Election name</label>
            <input
              id="electionName"
              value={electionName}
              onChange={handleElectionNameChange}
            />
          </div>
          {/* end date */}
          <div className={styles.inputWrapper}>
            <label htmlFor="electionDate">Election date</label>
            <input
              id="electionDate"
              value={electionDate ? formatDate(electionDate) : ""}
              onChange={handleElectionDateChange}
              type="date"
            />
          </div>

          <h3>Candidates</h3>
          {candidates.map((candidate, index, arr) => (
            <div key={index} className={styles.candidateInput}>
              <input
                value={candidate}
                placeholder="Candidate name"
                onChange={(e) => {
                  e.preventDefault();
                  setCandidates(
                    candidates.map((candidate, i) =>
                      i === index ? e.target.value : candidate
                    )
                  );
                }}
              />
              {arr.length > 2 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteCandidate(index);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            className={styles.addCandidateButton}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addCandidate();
            }}
          >
            Add Candidate
          </button>

          <div className={styles.footer}>
            <button
              onClick={(e) => {
                e.preventDefault();
                createElection();
              }}
            >
              {loading ? <CircularProgress size={20} /> : <span>Create</span>}
            </button>
            {error && <p className={styles.error}>Error creating election</p>}
          </div>
        </form>
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={showOverview}>Back</button>
      {renderContent()}
    </div>
  );
}
