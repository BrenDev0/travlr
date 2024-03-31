const router = require("express").Router();
const {
  loginUser,
  signupUser,
  logOut,
  allowAccess,
} = require("../controllers/userController");

//log in
router.post("/login", loginUser);

//sign in
router.post("/signup", signupUser);

//verfication
router.get("/", allowAccess);
//logout
router.get("/logout", logOut);

module.exports = router;
