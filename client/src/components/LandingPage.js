import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Voosh</h1>
      <Link to="/login" className="login-button">
        Login
      </Link>
    </div>
  );
};

export default LandingPage;
