require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

// Middlewares
const productsRouter = require("./routes/products");

app.get("/", (req, res, next) => {
  res.send("Hi I am a server");
});

// Routes
app.use("/api/v1/products", productsRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
