require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db } = require("./db/db");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", userRoutes);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
};

server();
