import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import app from "./app.js";

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
