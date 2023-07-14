import { useEffect, useState } from "react";
import VoterOverview from "./VoterOverview";
import OrganizationOverview from "./OrganizationOverview";
import { getUser } from "@api/UserApi";
import { IUser } from "types/IUser";
import VoterView from "@components/voter/VoterView";
import OrganizationView from "@components/org/OrganizationView";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        navigate("/");
      }
    })();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.is_voter) {
    return <VoterView />;
  }

  return <OrganizationView />;
}
