import { isEmpty, isNull, isUndefined } from 'lodash';
import { useEffect, useState } from 'react';

import { Candidate } from '../interfaces/Candidate';
import { Election } from '../interfaces/Election';
import Loading from '@components/Loading';
import ReactModal from 'react-modal';
import { getElectionsForVoter } from '../apis/VoterApis';

export const ElectionsForVoter = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingElection, setLoadingElection] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [elections, setElections] = useState<Election[] | null>(null);
    const [electionModalIsVisible, setElectionModalIsVisible] = useState<boolean>(false)
    const [clickedElection, setClickedElection] = useState<Election | null>(null);
    const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null)

    useEffect(() => {
        const getElections = async () => {
            try {
                setLoading(true)
                const { elections } = await getElectionsForVoter();
                setElections(elections);
                setLoading(false);
            } catch (error) {
                setError('Something went wrong with getting your elections.');
                console.log(error);
            }
        };
        getElections();
    }, []);


    const handleViewElectionDetailsClick = (electionId: string) => {
        const clickedElection = elections?.find((election) => election.id === electionId);
        if (!isUndefined(clickedElection)) {
            setClickedElection(clickedElection);
            setElectionModalIsVisible(true);
        }
    }


    const handleVoteForCandidateById = (candidateId: string) => {
        setVotedCandidateId(candidateId)
    }


    const ElectionForVoter = () => {
        return (<div>
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
                        <th>Cast a vote</th>
                    </tr>
                </thead>
                <tbody>
                    {clickedElection?.candidates.map((candidate: Candidate) => {
                        const numberOfVotes = isNull(votedCandidateId) ? 'First vote to see the number of votes' : (Math.floor(Math.random() * 100)).toString()
                        const alreadyVoted = !isNull(votedCandidateId);
                        return (
                            <tr>
                                <td>{candidate.name}</td>
                                <td>{candidate.campaignMessage}</td>
                                <td>{numberOfVotes}</td>
                                <td>
                                    <button onClick={() => handleVoteForCandidateById(candidate.id)} disabled={alreadyVoted}>Vote</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>)
    }


    if (loading) {
        return (<div><Loading /></div>)
    }
    if (!isNull(error)) {
        return (<text>{error}</text>)
    }
    if (isNull(elections) || isEmpty(elections)) {
        return (<text>You are not registered for any elections right now.</text>)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Election Name</th>
                        <th>Opening Time</th>
                        <th>Closing Time</th>
                        <th>Click here for more details or to cast a vote</th>
                    </tr>
                </thead>
                <tbody>
                    {elections.map((election: Election) => (
                        <tr key={election.id}>
                            <td>{election.name}</td>
                            <td>{election.openingTime.toISOString()}</td>
                            <td>{election.closingTime.toISOString()}</td>
                            <td><button onClick={() => handleViewElectionDetailsClick(election.id)}>Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactModal
                isOpen={electionModalIsVisible}
                onRequestClose={() => setElectionModalIsVisible(false)}
            >
                {ElectionForVoter()}
            </ReactModal>
        </div>
    );
};

export default ElectionsForVoter;
