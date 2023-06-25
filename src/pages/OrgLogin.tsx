import Loading from "@components/Loading";
import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@firebaseStuff/index";
import "../styles/OrgLogin.css";
import OrgSignup from "./OrgSignup";

const OrgLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
    navigate("/org-overview");
  };
  if (auth.currentUser) {
    // if the user is already logged in, redirect them to the overview.
    navigate("/org-overview");
  }

  return (
    <div className='contact'>

        <div 
        className='leftSide'
        style={{ backgroundImage: `url(${"image2.jpg"})` }}>
            </div> 

        <div className='rightSide'>

          <div>
            {loading ? (
              <Loading />
            ) : (
              <div>
                <h1>Organisation Login</h1>
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
                  {error && <p>Invalid email or password</p>}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Sign in
                  </button>

                  <Link to="/org-signup">
                    <button>Create Account</button>
                    </Link>
                </form>
                {/*Redirect to OrgSignup  */}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default OrgLogin;
