const express = require('express');
const { authRegisterController, authLoginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// Routes
// REGISTER
router.post("/register",authRegisterController)

// LOGIN 
router.post("/login",authLoginController)

// GET CURRENT USER
router.get("/currentUser",authMiddleware,currentUserController)

module.exports = router;