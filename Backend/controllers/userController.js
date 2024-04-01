const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validations
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({ message: "Incorrect email password" });
    }

    const token = createToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: false,
        withCredentials: true,
      })
      .send();
  } catch (error) {
    console.error(error);
  }
};

//signup user
const signupUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //validations
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Choose a stronger password" });
    }

    // check if user already exists
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    const token = createToken(user._id);

    res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      })
      .send();
  } catch (error) {
    console.error(error);
  }
};

//log out
const logOut = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: false,
      expires: new Date(0),
    })
    .send();
};

//allow access
const allowAccess = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }
    //verify token
    jwt.verify(token, process.env.SECRET);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
};
module.exports = { loginUser, signupUser, logOut, allowAccess };
