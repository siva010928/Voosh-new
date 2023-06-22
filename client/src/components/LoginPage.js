import React, { useState, useContext, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { authToken, login } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      history.push("/get-order");
    }
  }, [authToken, history]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!email.trim()) {
      errors.email = "Email or Phone Number is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login-user",
        {
          emailOrPhone: email,
          password: password,
        }
      );

      const { token } = response.data;

      login(token, "basic");

      history.push("/get-order");
    } catch (error) {
      console.error("Login failed:", error.message);
    }

    setEmail("");
    setPassword("");
    setErrors({});
  };

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        if (userCred) {
          userCred.user.getIdToken().then(async (token) => {
            try {
              const res = await axios.get(
                "http://localhost:5000/api/user/user-exists?token=" + token
              );
            } catch (e) {
              history.push("/login");
            }
          });
        }
      });
  };

  return (
    <div className={styles["login"]}>
      <h2>Login to Voosh</h2>
      <input
        type="text"
        placeholder="Phone/Email"
        value={email}
        onChange={handleEmailChange}
        className={
          errors.email ? `${styles.input} ${styles.error}` : styles.input
        }
      />
      {errors.email && (
        <span className={styles["error-message"]}>{errors.email}</span>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className={
          errors.password ? `${styles.input} ${styles.error}` : styles.input
        }
      />
      {errors.password && (
        <span className={styles["error-message"]}>{errors.password}</span>
      )}
      <button className={styles["normal-login-button"]} onClick={handleSubmit}>
        Login
      </button>
      <button
        onClick={loginWithGoogle}
        className={styles["google-login-button"]}
      >
        Login with Google
      </button>
      <Link to="/signup" className={styles["register-button"]}>
        Register
      </Link>
    </div>
  );
};

export default LoginPage;
