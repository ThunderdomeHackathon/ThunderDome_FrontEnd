import "../styles/OrganizationLogin.css";

import { Link, useNavigate } from "react-router-dom";
import { isNull, isString, isUndefined } from "lodash";

import Loading from "@components/Loading";
import { getVoter } from "../api/VoterApi";
import { signIn } from "../api/FirebaseApi";
import { useState } from "react";

const VoterLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const userCredential = await signIn(email, password);
    const foundUser = await getVoter();
    if (!isUndefined(userCredential) && !isNull(foundUser)) {
      setLoading(false);
      setError(null);
      navigate("/overview");
    }
    setLoading(false);
    setError("Could not sign in. Please try again.");
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
              <h1>Voter Login</h1>
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
                {isString(error) && <p>{error}</p>}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  Sign in
                </button>

                <Link to="/voter-signup">
                  <button>Create Account</button>
                </Link>
              </form>
              {/*Redirect to VoterSignup  */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterLogin;
