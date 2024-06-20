const { registerTrip, getTrips, addMoment } = require("../controllers/tripsController");
const verifyUser = require("../middlewares.js/authMiddleware");
const upload = require('../middlewares.js/filesMiddleware')

const router = require("express").Router();


router.use(verifyUser)

router.post("/register", registerTrip)
router.get("/get-trips", getTrips)
router.put("/add-moment/:id", upload.any('photos'), addMoment)


module.exports = router