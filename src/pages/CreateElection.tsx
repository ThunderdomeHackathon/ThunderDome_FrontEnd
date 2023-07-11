import Loading from "@components/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createElection } from "../apis/ElectionApis";

interface Candidate {
    name: string;
    campaignMessage: string;
}


const CreateElection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [candidates, setCandidates] = useState<Candidate[]>([{ name: "", campaignMessage: "" }]);
    const [timezoneOffset, setTimezoneOffset] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleCreateElection = async () => {
        setError(null);

        try {
            // Perform validation of openingTime and closingTime
            if (!openingTime || !closingTime) {
                setError("Please set the opening and closing time.");
                return;
            }


            const formattedOpeningTime = new Date(openingTime);
            const formattedClosingTime = new Date(closingTime);

            if (formattedOpeningTime >= formattedClosingTime) {
                setError("The opening time must be earlier than the closing time.");
                return;
            }

            // Perform validation of candidates
            if (candidates.length < 2) {
                setError("Please define at least two candidate.");
                return;
            }

            for (const candidate of candidates) {
                if (!candidate.name || !candidate.campaignMessage) {
                    setError("Please fill in all candidate fields.");
                    return;
                }

                if (candidate.name.length > 200) {
                    setError("Candidate name cannot exceed 200 characters.");
                    return;
                }

                if (candidate.campaignMessage.length > 1000) {
                    setError("Campaign message cannot exceed 1000 characters.");
                    return;
                }
            }

            if (hasDuplicateNames()) {
                setError("Please make each candidate name unique");
                return
            }


            // Prepare candidates array
            const formattedCandidates = candidates.map((candidate) => ({
                name: candidate.name.trim(),
                campaignMessage: candidate.campaignMessage.trim(),
            }));

            setLoading(true);

            console.log('asdfasdf', formattedOpeningTime, formattedClosingTime)
            // Call API to create the election
            const newElection = await createElection(
                formattedOpeningTime,
                formattedClosingTime,
                formattedCandidates
            );

            // Handle success, e.g., show success message, navigate to another page
            navigate("/elections-overview");
        } catch (error) {
            setError("An error occurred while creating the election. Please try again.");
            console.error(error);
        }

        setLoading(false);
    };


    const handleTimezoneOffsetChange = (timezoneOffset: string) => {
        setTimezoneOffset(timezoneOffset);
    };


    const hasDuplicateNames = () => {
        const names = candidates.map((candidate) => candidate.name);
        const uniqueNames = new Set(names);

        if (names.length !== uniqueNames.size) {
            return true; // Duplicate names exist
        }

        return false; // No duplicate names
    };

    const handleCandidateChange = (index: number, field: keyof Candidate, value: string) => {
        const updatedCandidates = [...candidates];
        updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
        setCandidates(updatedCandidates);
    };

    const handleAddCandidate = () => {
        setCandidates([...candidates, { name: "", campaignMessage: "" }]);
    };

    const handleRemoveCandidate = (index: number) => {
        const updatedCandidates = [...candidates];
        updatedCandidates.splice(index, 1);
        setCandidates(updatedCandidates);
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
                        <label>Timezone</label>
                        <input
                            value={timezoneOffset}
                            type="text"
                            onChange={(e) => handleTimezoneOffsetChange(e.target.value)}>
                        </input>
                        <h2>Candidates</h2>
                        {candidates.map((candidate, index) => (
                            <div key={index} className="candidate-field">
                                <input
                                    value={candidate.name}
                                    placeholder="Candidate Name"
                                    onChange={(e) => handleCandidateChange(index, "name", e.target.value)}
                                />
                                <input
                                    value={candidate.campaignMessage}
                                    placeholder="Campaign Message"
                                    onChange={(e) =>
                                        handleCandidateChange(index, "campaignMessage", e.target.value)
                                    }
                                />
                                <button type="button" onClick={() => handleRemoveCandidate(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddCandidate}>
                            Add Candidate
                        </button>

                        {error && <p className="error-message">{error}</p>}
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
