import "../styles/OrganizationLogin.css";

import { Link, useNavigate } from "react-router-dom";
import { isNull, isString, isUndefined } from "lodash";

import Loading from "@components/Loading";
import { getOrganization } from "../api/OrganizationApis";
import { signIn } from "../api/FirebaseApi";
import { useState } from "react";

const OrganizationLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const userCredential = await signIn(email, password);
    const foundOrganization = await getOrganization();
    if (!isUndefined(userCredential) && !isNull(foundOrganization)) {
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
              <h1>Organization Login</h1>
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

                <Link to="/organization-signup">
                  <button>Create Account</button>
                </Link>
              </form>
              {/*Redirect to OrganizationSignup  */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationLogin;
