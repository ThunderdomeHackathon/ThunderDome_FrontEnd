import { getIdToken } from "@firebaseStuff/index";

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

export const getCurrentElections = async () => {
    const authToken = await getIdToken();
    if (!authToken) {
        throw new Error("Organization is not logged in. Cannot create election.");
    }

    const response = await fetch("http://localhost:8000/elections/not-closed", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to get current elections.");
    }

    return response.json();
}