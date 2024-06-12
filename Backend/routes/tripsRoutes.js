const { registerTrip, getTrips } = require("../controllers/tripsController");
const verifyUser = require("../middlewares.js/authMiddleware");

const router = require("express").Router();


router.use(verifyUser)

router.post("/register", registerTrip)
router.get("/get-trips", getTrips)


module.exports = router