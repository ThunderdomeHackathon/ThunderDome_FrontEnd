import "../styles/OrgLogin.css";

import React, { useState } from "react";

import Loading from "@components/Loading";
import { auth } from "@firebaseStuff/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createVoter } from "../api/VoterApis";
import { useNavigate } from "react-router-dom";
import { createUser } from "@api/UserApi";

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
      await createUser(email, true)
      await createVoter(email);
    } catch (error) {
      // An error happened.
      setError(true);
      console.error(error);
    }

    setLoading(false);
    navigate("/overview");
  };

  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${"image3.jpg"})` }}
      ></div>

      <div className="rightSide">
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
                  placeholder="Enter email..."
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  value={password}
                  placeholder="Enter password..."
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
