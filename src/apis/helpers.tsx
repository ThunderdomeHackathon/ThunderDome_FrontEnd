import { Candidate, RawCandidate } from '../interfaces/Candidate';
import { Election, RawElection } from '../interfaces/Election';
import { Organization, RawOrganization } from '../interfaces/Organization';
import { RawVoter, Voter } from '../interfaces/Voter';

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


export const formatRawVoter = (voter: RawVoter) => {
    const formattedVoter: Voter = {
        id: voter.id,
        email: voter.email,
        privateKey: voter.private_key,
        createdAt: new Date(voter.created_at)
    }
    return formattedVoter;
}


export const formatRawOrganization = (organization: RawOrganization) => {
    const formattedOrganization: Organization = {
        id: organization.id,
        email: organization.email,
        elections: organization.elections.map((election: RawElection) => formatRawElection(election)),
        privateKey: organization.private_key,
        createdAt: new Date(organization.created_at)
    }
    return formattedOrganization
}