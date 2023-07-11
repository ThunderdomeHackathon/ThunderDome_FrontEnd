import { getIdToken } from "@firebaseStuff/index";


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