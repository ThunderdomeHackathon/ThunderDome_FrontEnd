import { Candidate, RawCandidate } from "../interfaces/Candidate";
import { Election, RawElection } from "../interfaces/Election";

import { formatRawElection } from "./helpers";
import { getIdToken } from "@firebaseStuff/index";
import { apiBaseUrl } from "./thunderdomeApi";

export const createElection = async (
  name: string,
  openingTime: Date,
  closingTime: Date,
  candidates: Array<{ name: string; campaignMessage: string }>,
  voterEmails: Array<string>
) => {
  const formattedCandidates = [];
  for (const candidate of candidates) {
    formattedCandidates.push({
      name: candidate.name,
      campaign_message: candidate.campaignMessage,
    });
  }
  const formattedOpeningTime = openingTime.toISOString();
  const formattedClosingTime = closingTime.toISOString();

  const authToken = await getIdToken();
  if (!authToken) {
    throw new Error("Organization is not logged in. Cannot create election.");
  }

  console.log(
    JSON.stringify({
      name: name,
      opening_time: formattedOpeningTime,
      closing_time: formattedClosingTime,
      candidates: formattedCandidates,
      voter_emails: voterEmails,
    })
  );
  const response = await fetch(apiBaseUrl + "/elections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      name: name,
      opening_time: formattedOpeningTime,
      closing_time: formattedClosingTime,
      candidates: formattedCandidates,
      voter_emails: voterEmails,
    }),
  });

  return response;
};

export const getElectionById = async (id: string) => {
  const authToken = await getIdToken();
  if (!authToken) {
    throw new Error("User is not logged in. Cannot get election.");
  }

  const response = await fetch(`${apiBaseUrl}/elections/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get election.");
  }
  const rawData: RawElection = await response.json();
  const formattedElection: Election = formatRawElection(rawData);
  return formattedElection;
};
