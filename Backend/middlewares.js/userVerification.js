const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.SCRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = User.findById(data._id);
      if (user) {
        return res.json({ status: true, user: user.email });
      } else {
        return res.json({ status: false });
      }
    }
  });
};

module.exports = userVerification;
