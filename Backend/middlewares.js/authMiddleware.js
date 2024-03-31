const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ messgae: "Unauthorized access" });
    }
    //verify token
    const verified = jwt.verify(token, process.env.SECRET);

    req.user = verified.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = auth;
