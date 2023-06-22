import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useContext } from "react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddOrderForm from "./components/AddOrderForm";
import OrderDetails from "./components/OrderDetails";
import { AuthContext } from "./components/AuthContext";
import axios from "axios";

function Routes() {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then(async (token) => {
          try {
            const res = await axios.get(
              "http://localhost:5000/api/user/user-exists?token=" + token
            );
            if (res.status === 200) {
              login(token, "googleOAUTH");
            }
          } catch (e) {
            console.log(e);
          }
        });
      }
    });
  }, [login]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <ProtectedRoute path="/add-order" component={AddOrderForm} />
        <ProtectedRoute path="/get-order" component={OrderDetails} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
