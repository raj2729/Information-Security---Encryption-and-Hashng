const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config");

// Routes
const userRoutes = require("./routes/userRoutes");

// express application
const app = express();

// Body Parser middleware, no need to install body-parser package
app.use(express.json());

// allow CORS
app.use(cors());

dotenv.config();

// Connecting to mongodb server
connectDB();

//Port
// const PORT = process.env.PORT;
const PORT = 8080;

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
