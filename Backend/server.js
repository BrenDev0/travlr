require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

const { db } = require("./db/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
};

server();
