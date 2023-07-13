import { getIdToken } from "@firebaseStuff/index";
import { Election, RawElection } from "../interfaces/election";
import { Candidate, RawCandidate } from '../interfaces/candidate';
import { formatRawElection } from "./helpers";

export const createElection = async (name: string, openingTime: Date, closingTime: Date, candidates: Array<{ name: string; campaignMessage: string }>, voterEmails: Array<string>) => {
    const formattedCandidates = []
    for (const candidate of candidates) {
        formattedCandidates.push({ name: candidate.name, campaign_message: candidate.campaignMessage });
    }
    const formattedOpeningTime = openingTime.toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short' });
    const formattedClosingTime = closingTime.toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short' });

    const authToken = await getIdToken();
    if (!authToken) {
        throw new Error("Organization is not logged in. Cannot create election.");
    }

    const response = await fetch("http://localhost:8000/elections", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            name: name,
            opening_time: openingTime,
            closing_time: closingTime,
            candidates: formattedCandidates,
            voter_emails: voterEmails
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create election.");
    }

    return response.json();
};

export const getElectionById = async (id: string) => {
    const authToken = await getIdToken();
    if (!authToken) { throw new Error("User is not logged in. Cannot get election.") }

    const response = await fetch(`http://localhost:8000/elections/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        }
    });

    if (!response.ok) { throw new Error("Failed to get election.") }
    const rawData: RawElection = await response.json();
    const formattedElection: Election = formatRawElection(rawData);
    return formattedElection;
}