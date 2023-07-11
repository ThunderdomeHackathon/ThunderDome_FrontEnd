import { ICandidate } from "./ICandidate";

export interface IElection {
  id: string;
  name: string;
  startDate: string;
  endDate: string;

  candidates?: string[];
}

export interface ICompleteElection extends IElection {
  winner: string;
  votes: {
    [candidate: string]: number;
  };
}
