const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_SECRET);
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

    //access token

    const token = createToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "Log in successful" });
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
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "New user successfully created" });
  } catch (error) {
    console.error(error);
  }
};

//log out
const logOut = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) {
    return res.sendStatus(204);
  }

  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie cleared" });
};

const allowAccess = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.ACCESS_SECRET, async (err, data) => {
      if (err) {
        return res.json({ status: false, message: "Unauthorized" });
      } else {
        const user = await User.findById(data._id);
        if (user) {
          return res.status(201).json({ status: true, user: data._id });
        } else {
          return res.json({ status: false, message: "Unauthorized" });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginUser, signupUser, logOut, allowAccess };
