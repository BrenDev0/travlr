const router = require("express").Router();
const { loginUser, signupUser } = require("../controllers/userController");
const userVerification = require("../middlewares.js/userVerification");

//log in
router.post("/login", loginUser);

//sign in
router.post("/signup", signupUser);

router.post("/", userVerification);

module.exports = router;
