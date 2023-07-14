import ElectionsForVoter from '@components/ElectionsForVoter';
import Loading from '@components/Loading';
import { Voter } from '../interfaces/Voter';
import { auth } from '@firebaseStuff/index';
import { isString } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const VoterOverview = () => {
  const navigate = useNavigate();
  const [voter, setVoter] = useState<Voter | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError('Something went wrong with signing out.')
        console.error(error);
      });
  };


  if (loading) {
    return (<div>
      <h1>You are logged in as a voter.</h1>
      <Loading />
    </div>)
  }

  if (isString(error)) {
    return (<div>
      <h1>You are logged in as a voter</h1>
      <text>{error}</text>
    </div>)
  }

  return (
    <div>
      <h1>You are Logged In As A Voter</h1>
      {ElectionsForVoter()}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default VoterOverview;
