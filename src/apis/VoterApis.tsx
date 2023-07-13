import { getIdToken } from '@firebaseStuff/index';
import { RawElection, Election } from 'interfaces/election';
import { formatRawElection } from '../apis/helpers';



export const createVoter = async (email: string) => {
    const authToken = await getIdToken();
    if (authToken === null) {
        throw new Error('Trying to create voter who is not signed in on firebase')
    }
    const data = await fetch('http://localhost:8000/voters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ email }),
    });
}


export const getVoter = async () => {
    const authToken = await getIdToken();
    if (authToken === null) {
        throw new Error('Trying to fetch data while user is not logged in');
    }
    const response = await fetch('http://localhost:8000/voters', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.json();
}


export const getElectionsForVoter = async () => {
    const authToken = await getIdToken();
    if (!authToken) { throw new Error('Voter is not logged in. Cannot get elections.') }
    console.log('getting elections')

    const response = await fetch('http://localhost:8000/voters/elections', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        }
    });

    if (!response.ok) { throw new Error('Failed to get elections.') }
    const rawData: { elections: RawElection[] } = await response.json();
    const formattedElections: Election[] = rawData.elections.map<Election>((election) => formatRawElection(election));
    console.log('successfully got elections')
    return { elections: formattedElections };
}