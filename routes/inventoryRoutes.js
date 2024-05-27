
const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getRecordControllerUser, getRecordControllerOrganization, getRecentBloodRecordController, getDonarRecords, getHospitalRecordController, getOrganizationController, getOrgnaisationForHospitalController } = require("../controllers/inventoryController");
const router = express.Router();


// ADD INVENTORY
// POST
router.post("/createInventory",authMiddleware,createInventoryController)

// GET ALL BLOOD RECORDS 
// All the organizations where a user has donated blood
// login with user/donar to see this
router.get("/getInventoryRecord/User",authMiddleware,getRecordControllerUser)


// GET ALL BLOOD RECORDS 
// All the users who have donated to a single organization
// login with organization to see this
router.get("/getInventoryRecord/Organization",authMiddleware,getRecordControllerOrganization)


// GET RECENT Blood Records
router.get("/get-recent-bloodRecord",authMiddleware,getRecentBloodRecordController)


// GET DONAR RECORDS
router.get("/donar-record", authMiddleware, getDonarRecords);

// GET HOSPITAL BLOOD RECORDS
router.post("/getHospitalRecord",authMiddleware,getHospitalRecordController)


// GET ORGANIZATION from PROFILES 
router.get("/get-organization-record",authMiddleware,getOrganizationController)

// // GET ORG for single Hospital
router.get("/get-organization-for-hospital",authMiddleware,getOrgnaisationForHospitalController)



module.exports = router;