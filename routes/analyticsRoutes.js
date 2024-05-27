const express = require("express");


const authMiddleware = require("../middlewares/authMiddleware");
const { bloodGroupDetailController } = require("../controllers/analyticsController");
const router = express.Router();

// Routes
// get Blood Data
router.get("/bloodGroups-data",authMiddleware,bloodGroupDetailController)

module.exports = router;
