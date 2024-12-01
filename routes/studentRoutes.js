// studentRoutes.js
const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");
const professorController = require("../controllers/professorController");
const router = express.Router();

// View available time slots for a professor
router.get(
  "/availability/:professorId",
  authMiddleware,
  studentController.viewAvailableSlots
);

// Book an appointment with a professor
router.post("/appointments", authMiddleware, studentController.bookAppointment);

// View all appointments for the student
router.get("/appointments", authMiddleware, studentController.viewAppointments);

module.exports = router;
