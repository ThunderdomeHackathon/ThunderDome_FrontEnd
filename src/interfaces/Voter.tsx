export interface Voter {
    id: string;
    email: string;
    privateKey: string
    createdAt: Date
};

export interface RawVoter {
    id: string;
    email: string;
    private_key: string
    created_at: string
};