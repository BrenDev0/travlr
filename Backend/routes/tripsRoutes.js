const { registerTrip, getTrips, addMoment } = require("../controllers/tripsController");
const verifyUser = require("../middlewares.js/authMiddleware");

const router = require("express").Router();


router.use(verifyUser)

router.post("/register", registerTrip)
router.get("/get-trips", getTrips)
router.put("/add-moment/:id", addMoment)


module.exports = router