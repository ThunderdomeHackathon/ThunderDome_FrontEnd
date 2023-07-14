import Loading from '@components/Loading';
import { createElection } from '../apis/ElectionApis';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Candidate {
    name: string;
    campaignMessage: string;
}

const CreateElection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [electionName, setElectionName] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [candidates, setCandidates] = useState<Candidate[]>([
        { name: '', campaignMessage: '' },
    ]);
    const [timezoneOffset, setTimezoneOffset] = useState('');
    const [voterEmails, setVoterEmails] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleCreateElection = async () => {
        setError(null);

        try {
            // Perform validation of electionName, openingTime, and closingTime
            if (!electionName || !openingTime || !closingTime) {
                setError('Please provide the election name, opening time, and closing time.');
                return;
            }

            const formattedOpeningTime = new Date(openingTime);
            const formattedClosingTime = new Date(closingTime);

            if (formattedOpeningTime >= formattedClosingTime) {
                setError('The opening time must be earlier than the closing time.');
                return;
            }

            // Perform validation of candidates
            if (candidates.length < 2) {
                setError('Please define at least two candidates.');
                return;
            }

            for (const candidate of candidates) {
                if (!candidate.name || !candidate.campaignMessage) {
                    setError('Please fill in all candidate fields.');
                    return;
                }

                if (candidate.name.length > 200) {
                    setError('Candidate name cannot exceed 200 characters.');
                    return;
                }

                if (candidate.campaignMessage.length > 1000) {
                    setError('Campaign message cannot exceed 1000 characters.');
                    return;
                }
            }

            if (hasDuplicateNames()) {
                setError('Please make each candidate name unique');
                return;
            }

            // Prepare candidates array
            const formattedCandidates = candidates.map((candidate) => ({
                name: candidate.name.trim(),
                campaignMessage: candidate.campaignMessage.trim(),
            }));

            const voterEmailsList = extractEmails(voterEmails);

            setLoading(true);

            // Call API to create the election
            const response = await createElection(
                electionName.trim(),
                formattedOpeningTime,
                formattedClosingTime,
                formattedCandidates,
                voterEmailsList
            );

            if (response.status === 422) {
                console.log(response);
                setLoading(false);
                setError('Please check your inputs.');
                return;
            }

            // Handle success, e.g., show success message, navigate to another page
            navigate('/organization-overview');
        } catch (error) {
            setError('An error occurred while creating the election. Please try again.');
            console.error(error);
        }

        setLoading(false);
    };

    const hasDuplicateNames = () => {
        const names = candidates.map((candidate) => candidate.name);
        const uniqueNames = new Set(names);
        return names.length !== uniqueNames.size;
    };

    const extractEmails = (emailString: string): string[] => {
        const emailList: string[] = emailString.split(/\s+/);
        const cleanedEmailList: string[] = emailList.map((email) => email.trim());
        return cleanedEmailList;
    };

    const handleCandidateChange = (
        index: number,
        field: keyof Candidate,
        value: string
    ) => {
        const updatedCandidates = [...candidates];
        updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
        setCandidates(updatedCandidates);
    };

    const handleAddCandidate = () => {
        setCandidates([...candidates, { name: '', campaignMessage: '' }]);
    };

    const handleRemoveCandidate = (index: number) => {
        const updatedCandidates = [...candidates];
        updatedCandidates.splice(index, 1);
        setCandidates(updatedCandidates);
    };

    const handleVoterEmailsChange = (voterEmails: string) => {
        setVoterEmails(voterEmails);
    };

    return (
        <div className='create-election'>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>Create Election</h1>
                    <form className='election-form'>
                        <label>Election Name</label>
                        <input
                            value={electionName}
                            type='text'
                            onChange={(e) => setElectionName(e.target.value)}
                        />
                        <label>Opening Time (timezone: UTC)</label>
                        <input
                            value={openingTime}
                            type='datetime-local'
                            onChange={(e) => setOpeningTime(e.target.value)}
                        />
                        <label>Closing Time (timezone: UTC)</label>
                        <input
                            value={closingTime}
                            type='datetime-local'
                            onChange={(e) => setClosingTime(e.target.value)}
                        />
                        <h2>Candidates</h2>
                        {candidates.map((candidate, index) => (
                            <div key={index} className='candidate-field'>
                                <input
                                    value={candidate.name}
                                    placeholder='Candidate Name'
                                    onChange={(e) =>
                                        handleCandidateChange(index, 'name', e.target.value)
                                    }
                                />
                                <input
                                    value={candidate.campaignMessage}
                                    placeholder='Campaign Message'
                                    onChange={(e) =>
                                        handleCandidateChange(index, 'campaignMessage', e.target.value)
                                    }
                                />
                                <button type='button' onClick={() => handleRemoveCandidate(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type='button' onClick={handleAddCandidate} style={{ marginBottom: '40px' }}>
                            Add Candidate
                        </button>

                        <input
                            value={voterEmails}
                            type='text'
                            placeholder='Voter emails (space separated)'
                            onChange={(e) => handleVoterEmailsChange(e.target.value)}>
                        </input>
                        {error && <p className='error-message'>{error}</p>}
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
            )
            }
        </div >
    );
};


export default CreateElection;
