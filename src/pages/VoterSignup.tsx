import Loading from "@components/Loading";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@firebaseStuff/index";
import "../styles/OrgLogin.css";
import { createVoter } from "../apis/VoterApis";

const VoterSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignUp = async () => {
    setError(false);
    if (password.length < 6) {
      setError(true);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await createVoter(email);
    } catch (error) {
      // An error happened.
      setError(true);
      console.error(error);
    }

    setLoading(false);
    navigate("/voter-overview");
  };

  return (
    <div className='contact'>

      <div
        className='leftSide'
        style={{ backgroundImage: `url(${"image3.jpg"})` }}>
      </div>

      <div className='rightSide'>

        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <h1>Voter Signup</h1>
              <form className="contact-form">
                <label>Email</label>
                <input
                  value={email}
                  type="email"
                  placeholder='Enter email...'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  value={password}
                  placeholder='Enter password...'
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignUp();
                  }}
                >
                  Sign up
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterSignup;