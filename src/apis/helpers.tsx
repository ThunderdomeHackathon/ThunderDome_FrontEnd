import { Election, RawElection } from '../interfaces/election';
import { Candidate, RawCandidate } from '../interfaces/candidate';



export const formatRawElection = (election: RawElection) => {
    const formattedElection: Election = {
        id: election.id,
        name: election.name,
        openingTime: new Date(election.opening_time),
        closingTime: new Date(election.closing_time),
        candidates: election.candidates.map<Candidate>((candidate: RawCandidate) => {
            const formattedCandidate: Candidate = {
                id: candidate.id,
                name: candidate.name,
                campaignMessage: candidate.campaign_message,
                createdAt: new Date(candidate.created_at)
            }
            return formattedCandidate;
        }),
        createdAt: new Date(election.created_at)
    }
    return formattedElection;
}