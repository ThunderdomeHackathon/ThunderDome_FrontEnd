import { Candidate, RawCandidate } from './Candidate'
import { CandidateResults } from './CandidateResults';

export interface Election {
    id: string;
    name: string;
    openingTime: Date;
    closingTime: Date;
    candidates: Candidate[];
    createdAt: Date;
};

export interface RawElection {
    id: string;
    name: string;
    opening_time: string;
    closing_time: string;
    candidates: RawCandidate[];
    created_at: string;
};

// Praise Code: created an interface for ElectionResults and RawElectionResults
export interface ElectionResults {
    id: string;
    candidates: CandidateResults[];
};