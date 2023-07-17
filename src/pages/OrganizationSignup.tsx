import "../styles/OrganizationLogin.css";

import React, { useState } from "react";

import Loading from "@components/Loading";
import { auth } from "@firebaseStuff/index";
import { createOrganization } from '../api/OrganizationApi';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { createUser } from "@api/UserApi";

const OrganizationSignup = () => {
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
      await createOrganization(email);
      await createUser(email, false)
    } catch (error) {
      // An error happened.
      setError(true);
      console.log(error);
    }

    setLoading(false);
    navigate("/overview");
  };

  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${"image2.jpg"})` }}
      ></div>

      <div className="rightSide">
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <h1>Organization Signup</h1>
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
                {error && (
                  <p>
                    {password.length < 6
                      ? "Password must be at least 6 characters long"
                      : "Error creating account"}
                  </p>
                )}
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

export default OrganizationSignup;
