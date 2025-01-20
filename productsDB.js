const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db/connect");
const Product = require("./models/productModel");

const jsonProducts = require("./products.json");

const importData = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);

    console.log("Data Imported Successfully");
  } catch (error) {
    console.log(error);
  }
};

importData();
