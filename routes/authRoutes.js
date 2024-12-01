const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Register a new user (student or professor)
router.post("/register", register);

// Login a user and generate a JWT token
router.post("/login", login);

module.exports = router;
