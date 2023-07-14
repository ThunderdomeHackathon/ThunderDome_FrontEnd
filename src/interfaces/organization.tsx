import { Election, RawElection } from '../interfaces/election';

export interface Organization {
    id: string;
    email: string;
    elections: Election[];
    privateKey: string;
    createdAt: Date;
};


export interface RawOrganization {
    id: string;
    email: string;
    elections: RawElection[];
    private_key: string;
    created_at: string;
};