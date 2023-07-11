import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import styles from "../styles/SignUp.module.scss";
import authApi from "../api/authApi";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import tdApi from "../api/tdApi";
import { FirebaseError } from "firebase/app";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVoter, setIsVoter] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [orgNameError, setOrgNameError] = useState(false);
  const [voterNameError, setVoterNameError] = useState(false);
  const [accountAlreadyExistsError, setAccountAlreadyExistsError] =
    useState(false);

  const handleSignUp = async () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }
    if (!isVoter && !orgName) {
      setOrgNameError(true);
      return;
    }
    if (isVoter && !voterName) {
      setVoterNameError(true);
      return;
    }

    setLoading(true);

    try {
      await authApi.signUp(email, password, { isVoter, voterName, orgName });
      navigate("/")
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        setAccountAlreadyExistsError(true);
      } else {
        setError(true);
      }
    }
    setLoading(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleVoterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoterNameError(false);
    setVoterName(e.target.value);
  };

  const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgNameError(false);
    setOrgName(e.target.value);
  };

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <h1>Sign up</h1>
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label>Email</label>
            <input
              id="email"
              value={email}
              type="email"
              placeholder="Enter email..."
              onChange={handleEmailChange}
            />
            {emailError && <p className={styles.error}>No email entered</p>}
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              placeholder="Enter password..."
              onChange={handlePasswordChange}
              type="password"
            />
            {passwordError && (
              <p className={styles.error}>No password entered</p>
            )}
          </div>

          <div className={styles.radioGroupWrapper}>
            <p>Are you a voter or organization?</p>
            <div className={styles.radioWrapper}>
              <input
                type="radio"
                id="voter"
                name="voter"
                value="voter"
                checked={isVoter}
                onChange={() => setIsVoter(true)}
              />
              <label htmlFor="voter">Voter</label>
            </div>

            <div className={styles.radioWrapper}>
              <input
                type="radio"
                id="organization"
                name="organization"
                value="organization"
                checked={!isVoter}
                onChange={() => setIsVoter(false)}
              />
              <label htmlFor="organization">Organization</label>
            </div>
            {isVoter ? (
              <div className={styles.inputWrapper}>
                <label htmlFor="voter-name">Voter name</label>
                <input
                  id="voter-name"
                  value={voterName}
                  onChange={handleVoterNameChange}
                />
                {voterNameError && (
                  <p className={styles.error}>No voter name entered</p>
                )}
              </div>
            ) : (
              <div className={styles.inputWrapper}>
                <label htmlFor="org-name">Organization name</label>
                <input
                  id="org-name"
                  value={orgName}
                  onChange={handleOrgNameChange}
                />
                {orgNameError && (
                  <p className={styles.error}>No organization name entered</p>
                )}
              </div>
            )}
            {accountAlreadyExistsError && (
              <p className={styles.error}>
                An account with that email already exists
              </p>
            )}
            {error && (
              <p className={styles.error}>
                Something went wrong, please try again later
              </p>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              {loading ? <CircularProgress size={20} /> : <span>Sign up</span>}
            </button>
          </div>
        </form>
        <div className={styles.footer}>
          <p>Already have an account?</p>
          <Link to="/login">
            <button className={styles.button}>Login</button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
