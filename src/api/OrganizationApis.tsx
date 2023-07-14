import { Election, RawElection } from "../interfaces/Election";

import { formatRawElection } from "./helpers";
import { getIdToken } from "@firebaseStuff/index";
import { apiBaseUrl } from "./thunderdomeApi";

export const createOrganization = async (email: string) => {
  const authToken = await getIdToken();
  if (authToken === null) {
    throw new Error(
      "Trying to create organization who is not signed in on firebase"
    );
  }
   await fetch(`${apiBaseUrl}/organizations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ email }),
  });
};

export const getOrganization = async () => {
  const authToken = await getIdToken();
  if (authToken === null) {
    return null;
  }
  const response = await fetch(`${apiBaseUrl}/organizations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status === 404) {
    return null;
  } else {
    return await response.json();
  }
};

export const getElectionsForOrganization = async () => {
  const authToken = await getIdToken();
  if (!authToken) {
    throw new Error("Organization is not logged in. Cannot get elections.");
  }

  const response = await fetch(
    `${apiBaseUrl}/organizations/elections`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get elections.");
  }
  const rawData: { elections: RawElection[] } = await response.json();
  const formattedElections: Election[] = rawData.elections.map<Election>(
    (election) => formatRawElection(election)
  );
  return { elections: formattedElections };
};
