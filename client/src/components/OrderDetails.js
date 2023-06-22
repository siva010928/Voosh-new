import React, { useContext, useEffect, useState } from "react";
import styles from "./OrderDetails.module.css";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import "firebase/auth";

const OrderDetails = () => {
  const history = useHistory();
  const { authToken, authTokenType, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    if (authTokenType === "googleOAUTH") {
      try {
        await firebase.auth().signOut();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    logout();
    history.push("/login");
  };

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/order/get-order",
          {
            headers: {
              authorization: `${authTokenType} ${authToken}`,
            },
          }
        );
        if (!response.data.order) {
          history.push("/add-order");
          return;
        }
        setData(response.data.order);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <p> Loading...</p>
  ) : (
    <div className={styles["order-details"]}>
      <h2>Order Details</h2>
      <div className={styles["order-info"]}>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>Order ID:</span>
          <span className={styles["info-value"]}>{data._id}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>Item Name:</span>
          <span className={styles["info-value"]}>{data.name}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>Quantity:</span>
          <span className={styles["info-value"]}>{data.quantity}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>Cost:</span>
          <span className={styles["info-value"]}>{data.cost}</span>
        </div>
      </div>
      <button className={styles["logout-button"]} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default OrderDetails;
