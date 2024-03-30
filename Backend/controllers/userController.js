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
      res.json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      res.json({ message: "Incorrect email password" });
    }

    const token = createToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "Log in successful", success: true });
  } catch (error) {
    console.error(error);
  }
};

//signup user
const signupUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    //validations
    if (!email || !name || !password) {
      return res.json({ message: "All fields required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ message: "Enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      res.json({ message: "Choose a stronger password" });
    }

    // check if user already exists
    const exists = await User.findOne({ email });

    if (exists) {
      return res.json({ message: "Email already in use" });
    }

    const hash = bcrypt.hash(password, 10);

    const user = User.create({
      name,
      email,
      password: hash,
    });

    const token = createToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "New user registered", success: true, user });

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginUser, signupUser };
