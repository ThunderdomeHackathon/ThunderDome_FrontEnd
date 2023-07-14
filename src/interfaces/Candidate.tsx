export interface Candidate {
    id: string;
    name: string;
    campaignMessage: string;
    createdAt: Date;
};

export interface RawCandidate {
    id: string;
    name: string;
    campaign_message: string;
    created_at: string;
};