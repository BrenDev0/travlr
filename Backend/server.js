require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const tripsRoute = require("./routes/tripsRoutes")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db } = require("./db/db");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", userRoutes);
app.use("/api/trips", tripsRoute )


const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
};

server();
