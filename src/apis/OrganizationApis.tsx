import { getIdToken } from "@firebaseStuff/index";


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