import Loading from "@components/Loading";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createElection } from "../apis/ElectionApis";

const CreateElection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [error, setError] = useState(false);

  const handleCreateElection = async () => {
    setLoading(true);
    setError(false);

    try {
      // Perform validation of openingTime and closingTime here if needed

      // Call API to create the election
      const newElection = await createElection(new Date(openingTime), new Date(closingTime));
      
      // Handle success, e.g., show success message, navigate to another page
      console.log("Election created:", newElection);
      navigate("/elections-overview");
    } catch (error) {
      setError(true);
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="create-election">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>Create Elections</h1>
          <form className="election-form">
            <label>Opening Time</label>
            <input
              value={openingTime}
              type="datetime-local"
              onChange={(e) => setOpeningTime(e.target.value)}
            />
            <label>Closing Time</label>
            <input
              value={closingTime}
              type="datetime-local"
              onChange={(e) => setClosingTime(e.target.value)}
            />
            {error && (
              <p>An error occurred while creating the election. Please try again.</p>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCreateElection();
              }}
            >
              Create Election
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateElection;
