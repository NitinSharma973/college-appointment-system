const express = require("express");
const professorController = require("../controllers/professorController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Set availability for a professor
router.post(
  "/availability",
  authMiddleware,
  professorController.setAvailability
);

// Get availability for a professor
router.get(
  "/availability",
  authMiddleware,
  professorController.getAvailability
);

// Get appointments for a professor
router.get(
  "/appointments",
  authMiddleware,
  professorController.getAppointments
);

// Cancel an appointment
router.delete(
  "/appointments/:appointmentId",
  authMiddleware,
  professorController.cancelAppointment
);

module.exports = router;
