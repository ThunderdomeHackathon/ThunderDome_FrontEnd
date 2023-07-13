import Loading from "@components/Loading";
import { useState } from "react";
import { auth } from "@firebaseStuff/index";
import { useNavigate } from "react-router-dom";
import ElectionsForOrganization from "@components/ElectionsForOrganization";
import { Organization } from '../interfaces/organization';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError('Something went wrong while signing out.')
        console.error(error);
      });
  };

  const handleCreateElection = () => {
    navigate('/org-overview/create-election');
  };


  if (loading) {
    return (<div><Loading /></div>)
  }

  return (
    <div>
      {ElectionsForOrganization()}
      <button onClick={handleCreateElection}>Create election</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default OrgOverview;
