import Loading from "@components/Loading";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebaseStuff/index";
import { getCurrentElectionsForVoter } from "../apis/VoterApis";

export const CurrentElectionsForVoter = () => {
    const [data, setData] = useState<any | null>(null);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getCurrentElectionsForVoter();
                setData(fetchedData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderElectionsTable = () => {
        if (!data || !data.elections || data.elections.length === 0) {
            return (
                <text>You are not registered for any elections right now.</text>
            );
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Election Name</th>
                        <th>Opening Time</th>
                        <th>Closing Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.elections.map((election: any) => (
                        // need to use opening_time NOT openingTime
                        <tr key={election.id}>
                            <td>{election.name}</td>
                            <td>{election.opening_time}</td>
                            <td>{election.closing_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {renderElectionsTable()}
                </>
            )}
        </div>
    );
};

export default CurrentElectionsForVoter;
