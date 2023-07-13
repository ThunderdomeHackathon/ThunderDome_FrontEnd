import { getIdToken } from "@firebaseStuff/index";
import { Election, RawElection } from '../interfaces/election';
import { formatRawElection } from '../apis/helpers';


export const createOrganization = async (email: string) => {
    const authToken = await getIdToken();
    if (authToken === null) {
        throw new Error('Trying to create organization who is not signed in on firebase')
    }
    const data = await fetch("http://localhost:8000/organizations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ email }),
    });
}


export const getOrganization = async () => {
    const authToken = await getIdToken();
    if (authToken === null) {
        throw new Error('Trying to fetch data while user is not logged in');
    }
    const response = await fetch("http://localhost:8000/organizations", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.json();
}


export const getElectionsForOrganization = async () => {
    const authToken = await getIdToken();
    if (!authToken) { throw new Error("Organization is not logged in. Cannot get elections.") }

    const response = await fetch("http://localhost:8000/organizations/elections", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        }
    });

    if (!response.ok) { throw new Error("Failed to get elections.") }
    const rawData: { elections: RawElection[] } = await response.json();
    const formattedElections: Election[] = rawData.elections.map<Election>((election) => formatRawElection(election));
    return { elections: formattedElections };
}