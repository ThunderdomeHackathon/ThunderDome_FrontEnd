import { Election } from '../interfaces/election';

export interface Organization {
    id: string;
    email: string;
    elections: string[] | Election[];
    createdAt: string;
};