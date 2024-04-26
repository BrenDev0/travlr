const router = require("express").Router();
const {
  loginUser,
  signupUser,
  logOut,
  verifyAuth,
} = require("../controllers/userController");

//log in
router.post("/login", loginUser);

//sign in
router.post("/signup", signupUser);

//logout
router.get("/logout", logOut);

//verify
router.get("/", verifyAuth);

module.exports = router;
