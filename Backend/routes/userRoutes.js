const router = require("express").Router();
const {
  loginUser,
  signupUser,
  logOut,
} = require("../controllers/userController");

//log in
router.post("/login", loginUser);

//sign in
router.post("/signup", signupUser);

//logout
router.get("/logout", logOut);

module.exports = router;
