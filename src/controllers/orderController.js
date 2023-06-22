import Order from "../models/order.js";

const addOrder = async (req, res) => {
  try {
    const { name, cost, quantity } = req.body;
    const userId = req.userId;
    const order = new Order({ name, cost, quantity, userId });
    await order.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const order = await Order.findOne({ userId });
    if (!order) {
      return res.status(200).json({ order: false });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: "Failed to get order details" });
  }
};

export { addOrder, getOrder };
