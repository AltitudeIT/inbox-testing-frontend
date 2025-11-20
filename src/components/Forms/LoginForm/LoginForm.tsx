import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../../../services/auth/AuthService";
import { isAxiosError, type AxiosError } from "axios";
import { toast } from "react-toastify";
import styles from "./LoginForm.module.css";
import { CircularProgress } from "@mui/material";

const LoginForm = () => {
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = () => {
    if (email.trim() === "") {
      setIsEmailError(true);
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setIsPasswordError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    loginUser({ email, password })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          if (error.response?.status) {
            // @ts-ignore
            toast.error(error.response?.data?.message);
          } else {
            toast.error("Something went wrong");
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.rootDiv}>
      <div className={styles.containerDiv}>
        <div className={styles.topDiv}>
          <h1 className={styles.title}>Welcome back!</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputDiv}>
            <label htmlFor="email" className={styles.label}>
              E-Mail
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                onFocus={() => setIsEmailError(false)}
                className={`${styles.inputField} ${
                  isEmailError ? styles.inputError : ""
                }`}
              />
              {isEmailError && (
                <p className={styles.errorTextInside}>Email is required</p>
              )}
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                onFocus={() => setIsPasswordError(false)}
                className={`${styles.inputField} ${
                  isPasswordError ? styles.inputError : ""
                }`}
                disabled={isLoading}
              />
              {isPasswordError && (
                <p className={styles.errorTextInside}>Password is required</p>
              )}
            </div>
          </div>
          <div className={styles.rememberMeDiv}>
            <div className={styles.checkDiv}>
              <input type="checkbox" className={styles.checkBox} />
              <p className={styles.rememberMeText}>Remember me</p>
            </div>
            <p className={styles.passwordForgottenText}>
              Forgot your password?
            </p>
          </div>
          <button
            type="submit"
            className={`${styles.loginButton} ${
              isLoading ? styles.loading : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
