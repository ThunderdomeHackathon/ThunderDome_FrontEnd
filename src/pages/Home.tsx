import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { IVoter } from "../types/IVoter";
import { IOrganization } from "../types/IOrganization";
import VoterOverview from "../components/voter/VoterOverview";
import OrgOverview from "../components/org/OrgOverview";
import MainLayout from "../components/utility/MainLayout";

const Home = () => {
  const navigate = useNavigate();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profile, setProfile] = useState<IVoter | IOrganization | null>(null);

  useEffect(() => {
    (async () => {
      setLoadingProfile(true);
      const profile = await authApi.getProfile(); // Replace this with actual API call
      setProfile(profile);
      setLoadingProfile(false);
    })();
  }, []);

  const handleSignOut = async () => {
    try {
      await authApi.logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    if (loadingProfile) {
      return <div>Loading...</div>;
    }

    if (!profile) {
      return <div>Something went wrong</div>;
    }

    if (profile.isVoter) {
      return <VoterOverview profile={profile} />;
    }
    return <OrgOverview profile={profile} />;
  };

  return (
    <MainLayout>
      <div>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
      {renderContent()}
    </MainLayout>
  );
};

export default Home;
