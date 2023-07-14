import ElectionsForOrganization from '@components/ElectionsForOrganization';
import Loading from '@components/Loading';
import { Organization } from '../interfaces/Organization';
import { auth } from '@firebaseStuff/index';
import { signOut } from '../apis/FirebaseApis';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrganizationOverview = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCreateElection = () => {
    navigate('/organization-overview/create-election');
  };


  if (loading) {
    return (<div><Loading /></div>)
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
