import axios from "axios";
import { auth } from "../firebaseStuff/index";
import { ICompleteElection, IElection } from "../types/IElection";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const get = async (url: string) => {
  const authToken = await auth.currentUser!.getIdToken();
  return await axios.get(`${API_BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

const post = async (url: string, body?: any) => {
  const authToken = await auth.currentUser!.getIdToken();
  return await axios.post(`${API_BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

const createElection = async (
  electionName: string,
  endDate: Date,
  candidates: string[]
) => {
  return await post("/elections/", {
    name: electionName,
    end_date: endDate,
    candidates: candidates,
  });
};

const getElections = async () => {
  const response = await get("/elections/");
  // create election objects IElection

  const pendingElections: IElection[] = response.data.pending_elections.map(
    (election: any) => {
      return {
        id: election.id,
        name: election.name,
        endDate: new Date(election.end_date),
        candidates: election.candidates,
      };
    }
  );

  const completeElections: ICompleteElection[] = response.data.complete_elections.map(
    (election: any) => {
      return {
        id: election.id,
        name: election.name,
        endDate: new Date(election.end_date),
        candidates: election.candidates,
        winner: election.winner,
        votes: election.votes,
      };
    }
  );

  return {
    pendingElections,
    completeElections,
  };
};

const tdApi = {
  get,
  post,
  createElection,
  getElections,
};

export default tdApi;
