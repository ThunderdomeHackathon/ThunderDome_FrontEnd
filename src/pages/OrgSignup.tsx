import Loading from "@components/Loading";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@firebaseStuff/index";
import "../styles/OrgLogin.css";

const OrgSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError(false);

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Account creation successful.
        const user = userCredential.user;
        })
        .catch((error) => {
        // An error happened.
        setError(true);
        console.error(error);
        });

    setLoading(false);
    navigate("/org-overview");
        };

  return (
    <div className='contact'>

        <div 
        className='leftSide'
        style={{ backgroundImage: `url(${"image.jpg"})` }}>
            </div> 

        <div className='rightSide'>

          <div>
            {loading ? (
              <Loading />
            ) : (
              <div>
                <h1>Organisation Signup</h1>
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

export default OrgSignup;