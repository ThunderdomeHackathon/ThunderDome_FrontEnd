import ElectionsForVoter from "@components/voter/ElectionsForVoter";
import Loading from "@components/Loading";
import { Voter } from "../interfaces/Voter";
import { auth } from "@firebaseStuff/index";
import { isString } from "lodash";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/VoterOverview.css";

const VoterOverview = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  if (loading) {
    return (
      <>
      <div className='VoterOverview'>

      <div className="leftSide">
        <h1>You are logged in as a voter.</h1>
        <Loading />
      </div>

      <div 
    className='rightSide'
    style={{ backgroundImage: `url(${"image6.jpg"})`}}>
    </div>

      </div>
      </>
    );
  }


  if (isString(error)) {
    return (

      <>
      <div className='VoterOverview'>

      <div className="leftSide">
        <h1>You are logged in as a voter</h1>
        <text>{error}</text>
      </div>

      <div 
    className='rightSide'
    style={{ backgroundImage: `url(${"image7.jpg"})`}}>
    </div>

      </div>
      </>

    );
  }

  return (

    <>
      <div className='VoterOverview'>

    <div className="leftSide">
      <h1>You are Logged In As A Voter</h1>
      {ElectionsForVoter()}
    </div>

    <div 
    className='rightSide'
    style={{ backgroundImage: `url(${"image8.jpg"})`}}>
    </div>

    </div>
      </>

  );
};

export default VoterOverview;
