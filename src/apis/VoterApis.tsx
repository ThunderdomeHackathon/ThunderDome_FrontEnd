import { getIdToken } from "@firebaseStuff/index";


export const createVoter = async (email: string) => {
    const authToken = await getIdToken();
    if (authToken === null) {
        throw new Error('Trying to create voter who is not signed in on firebase')
    }
    const data = await fetch("http://localhost:8000/voters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ email }),
    });
}


export const getVoter = async () => {
    const authToken = await getIdToken();
    if (authToken === null) {
        throw new Error('Trying to fetch data while user is not logged in');
    }
    const response = await fetch("http://localhost:8000/voters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.json();
}


export const getCurrentElectionsForVoter = async () => {
    const authToken = await getIdToken();
    if (!authToken) {
        throw new Error("Voter is not logged in. Cannot get elections.");
    }

    const response = await fetch("http://localhost:8000/voters/elections/not-closed", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to create election.");
    }

    return response.json();
}