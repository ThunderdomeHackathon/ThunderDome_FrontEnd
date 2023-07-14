import ElectionsForOrganization from "@components/org/ElectionsForOrganization";
import Loading from "@components/Loading";
import { Organization } from "../interfaces/Organization";
import { auth } from "@firebaseStuff/index";
import { signOut } from "../api/FirebaseApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OrgForms } from "@components/org/OrganizationView";

type Props = {
  setForm: (form: OrgForms) => void;
};

const OrganizationOverview = ({ setForm }: Props) => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleCreateElection = () => {
    setForm(OrgForms.CREATE_ELECTION);
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {ElectionsForOrganization()}
      <div>
        <button onClick={handleCreateElection}>Create election</button>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default OrganizationOverview;
