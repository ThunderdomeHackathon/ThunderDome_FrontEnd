import Loading from "../components/utility/Loading";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseStuff/index";
import styles from "../styles/Login.module.scss";
import AuthLayout from "../components/AuthLayout";
import authApi from "../api/authApi";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await authApi.login(email, password);
      console.log(response);
      navigate("/");
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(e.target.value);
  };

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              type="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              id="passowrd"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
          </div>
          {error && (
            <p className={styles.errorText}>Invalid email or password</p>
          )}
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {loading ? (
                <CircularProgress className={styles.loadingIcon} size={20} />
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
        </form>
        <div className={styles.footer}>
          <p>Already have an account?</p>
          <div className={styles.buttonContainer}>
            <Link to="/signup">
              <button className={styles.button}>Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
