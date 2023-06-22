import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  name: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
