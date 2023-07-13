import { Candidate, RawCandidate } from '../interfaces/candidate'

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