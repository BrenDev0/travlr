const router = require("express").Router();
const { loginUser, signupUser } = require("../controllers/userController");

//log in
router.post("/login", loginUser);

//sign in
router.post("/signup", signupUser);

module.exports = router;
