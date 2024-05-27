// REGISTER Controller

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRegisterController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User ALready exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// LOGIN USER
const authLoginController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Enter Correct Email",
        
      });
    }

    // Check Role
    if(existingUser.role !== req.body.role){
      return res.status(500).send({
        success:false,
        message:"Role Does Not Match"
      })
    }

    // Compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials ",
      });
    }
    // Toekn JWT
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      success: true,
      messager: "Login Succesfull",
      token,
      existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};


// GET CURRENT USER
const currentUserController =async (req,res)=>{
try {
  const user = await userModel.findOne({_id:req.body.userId});
  return res.status(200).send({
    success:true,
    message:"User Fetched Succesfully",
    user,
  })
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success:false,
    message:"Unable to Get Current User"
  })
}
}

module.exports = {
  authRegisterController,
  authLoginController,
  currentUserController,
};
