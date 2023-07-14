import { Election, RawElection } from "interfaces/Election";

import { formatRawElection } from "./helpers";
import { getIdToken } from "@firebaseStuff/index";
import { apiBaseUrl } from "./thunderdomeApi";

export const createVoter = async (email: string) => {
  const authToken = await getIdToken();
  if (authToken === null) {
    throw new Error("Trying to create voter who is not signed in on firebase");
  }
  await fetch(`${apiBaseUrl}/voters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ email }),
  });
};

export const getVoter = async () => {
  const authToken = await getIdToken();
  if (authToken === null) {
    return null;
  }
  const response = await fetch(`${apiBaseUrl}/voters/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status === 404) {
    return null;
  }
  return response.json();
};

export const getElectionsForVoter = async () => {
  const authToken = await getIdToken();
  if (!authToken) {
    throw new Error("Voter is not logged in. Cannot get elections.");
  }

  const response = await fetch(`${apiBaseUrl}/voters/elections/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get elections.");
  }
  const rawData: { elections: RawElection[] } = await response.json();
  const formattedElections: Election[] = rawData.elections.map<Election>(
    (election) => formatRawElection(election)
  );
  return { elections: formattedElections };
};
