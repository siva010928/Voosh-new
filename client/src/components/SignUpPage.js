import React, { useState, useContext } from "react";
import styles from "./SignUpPage.module.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const SignUpPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/add-user",
        {
          email,
          name,
          phoneNumber: phone,
          password,
        }
      );

      const { token } = response.data;

      login(token, "basic");

      history.push("/add-order");
    } catch (error) {
      console.error("Login failed:", error.message);
    }

    setEmail("");
    setPhone("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <div className={styles.signup}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label>Email:</label>
          <input
            type="email"
            className={errors.email ? styles.error : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className={styles["error-message"]}>{errors.email}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Phone:</label>
          <input
            type="tel"
            className={errors.phone ? styles.error : ""}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <span className={styles["error-message"]}>{errors.phone}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Name:</label>
          <input
            type="text"
            className={errors.name ? styles.error : ""}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <span className={styles["error-message"]}>{errors.name}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Password:</label>
          <input
            type="password"
            className={errors.password ? styles.error : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className={styles["error-message"]}>{errors.password}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Confirm Password:</label>
          <input
            type="password"
            className={errors.confirmPassword ? styles.error : ""}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className={styles["error-message"]}>
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login" className={styles["login-button"]}>
        Already have an account? Login
      </Link>
    </div>
  );
};

export default SignUpPage;
