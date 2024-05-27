const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
// CREATE INVENTORY/Blood Record
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    // validation
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "No User Found with that Email",
      });
    }

    if (inventoryType === "in" && user.role !== "donar") {
      return res.status(500).send({
        success: false,
        message: "Not A Donar Account",
      });
    }

    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(500).send({
        success: false,
        message: "Not A Hospital Account",
      });
    }

    // SAVE RECORD
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(200).send({
      success: true,
      message: "New Blood Record Added",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create inventory Api",
      error,
    });
  }
};

// GET ALL Blood RECORDS of a user ,
// here we want to see at how many organizations the donar has donated bloo<<<<d
const getRecordControllerUser = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ donar: req.body.userId })

      // This populate replaces the ID with all the data present in ID

      // .populate("donar")
      .populate("organization")
      .sort({ createdAt: -1 });
    // Sortinf function is used

    return res.status(200).send({
      success: false,
      message: "All Records GET Succesfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Records Api",
      error,
    });
  }
};

// GET ALL Blood RECORDS of users who have donated to a single organization ,
// here we want to see at how many users have donated to a organization
const getRecordControllerOrganization = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organization: req.body.userId })
      // .populate("donar")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: false,
      message: "All Records GET Succesfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Records Api",
      error,
    });
  }
};

// GET RECENT BLOOD RECORD present at any ORGANIZATION
const getRecentBloodRecordController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      // here we set the limit that we need only 3 records
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Recent Blood Api",
    });
  }
};

// GET DONAR RECORDS
const getDonarRecords = async (req, res) => {
  try {
    const organization = req.body.userId;
    const donarsId = await inventoryModel.distinct("donar", { organization });

    const donar = await userModel.find({ _id: { $in: donarsId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched",
      donar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GetDonar Record Api",
    });
  }
};

//  GET HOSPITAL BLOOD RECORDS
const getHospitalRecordController = async (req, res) => {
  const inventory = await inventoryModel
    .find(req.body.filters) // in filter we provide all specific details to find record
    /* 
  Within req.body, you might have a filters property that includes the criteria for filtering the data you want to retrieve from the database.

  Example Request
  Consider a client wants to find all blood donations of type "O+" made in "New York" within the year 2023. They send a POST request with the following body:

{
  "filters": {
    "bloodType": "O+",
    "location": "New York",
    "date": { "$gte": "2023-01-01", "$lte": "2023-12-31" }
  }
}
   */
    .populate("donar")
    .populate("hospital")
    .populate("organization")
    .sort({ createdAt: -1 });

  return res.status(200).send({
    success: true,
    message: "Get hospital Blood Record",
    inventory,
  });
};

// GET ORGANIZATION from  PROFILES
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donar });

    const organization = await userModel.find({ _id: { $in: orgId } });
    /* 
    The $in operator in MongoDB is used to find documents where a field's value matches any value in a given array. 
    Let's break down the usage of $in in the context of your getOrganizationController function.
    */

    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG  profiles API",
      error,
    });
  }
};

// GET ORG for single  Hospital
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};


module.exports = {
  createInventoryController,
  getRecordControllerUser,
  getRecordControllerOrganization,
  getRecentBloodRecordController,
  getDonarRecords,
  getHospitalRecordController,
  getOrganizationController,
  getOrgnaisationForHospitalController,
};
