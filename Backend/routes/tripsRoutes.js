const { registerTrip } = require("../controllers/tripsController");
const verifyUser = require("../middlewares.js/authMiddleware");

const router = require(express).Router();


router.use(verifyUser)

router.post("/register", registerTrip)


module.exports = router