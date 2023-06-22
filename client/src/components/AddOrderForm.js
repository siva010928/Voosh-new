import React, { useState, useContext, useEffect } from "react";
import styles from "./AddOrderForm.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const AddOrderForm = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { authToken, authTokenType, logout } = useContext(AuthContext);

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
        console.log(response.data);
        if (response.data.order) {
          history.push("/get-order");
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!itemName.trim()) {
      errors.itemName = "Item Name is required";
    }

    if (!quantity.trim()) {
      errors.quantity = "Quantity is required";
    }

    if (!cost.trim()) {
      errors.cost = "Cost is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/add-order",
        {
          name: itemName,
          cost,
          quantity,
        },
        {
          headers: {
            authorization: `${authTokenType} ${authToken}`,
          },
        }
      );

      history.push("/get-order");
    } catch (error) {
      console.error("Something went wrong! :", error.message);
    }

    setItemName("");
    setQuantity("");
    setCost("");
    setErrors({});
  };

  return (
    <div className={styles["add-order-form"]}>
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={handleItemNameChange}
            className={errors.itemName ? styles["input-error"] : ""}
          />
          {errors.itemName && (
            <span className={styles["error-message"]}>{errors.itemName}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className={errors.quantity ? styles["input-error"] : ""}
          />
          {errors.quantity && (
            <span className={styles["error-message"]}>{errors.quantity}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="cost">Cost</label>
          <input
            type="text"
            id="cost"
            value={cost}
            onChange={handleCostChange}
            className={errors.cost ? styles["input-error"] : ""}
          />
          {errors.cost && (
            <span className={styles["error-message"]}>{errors.cost}</span>
          )}
        </div>
        <button type="submit" className={styles["submit-button"]}>
          Submit
        </button>
        <button className={styles["logout-button"]} onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;
