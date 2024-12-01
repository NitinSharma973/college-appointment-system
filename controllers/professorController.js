// Mock database for demonstration
// const availabilityData = [];
// const appointments = [];
const { availabilityData, appointments } = require("../utils/sharedData");

// Set availability for a professor
exports.setAvailability = (req, res) => {
  const { professorId, date, timeSlot } = req.body;
  if (!professorId || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  availabilityData.push({ professorId, date, timeSlot, isBooked: false });
  res
    .status(201)
    .json({ message: "Availability set successfully", availabilityData });
};

// Get availability for a specific professor
exports.getAvailability = (req, res) => {
  const professorId = parseInt(req.query.professorId);
  if (!professorId) {
    return res.status(400).json({ error: "Professor ID is required" });
  }
  const availableSlots = availabilityData.filter(
    (slot) => slot.professorId === professorId && !slot.isBooked
  );
  res.status(200).json({ availableSlots });
};

// Get all appointments for the professor
exports.getAppointments = (req, res) => {
  const professorId = req.query.professorId;
  if (!professorId) {
    return res.status(400).json({ error: "Professor ID is required" });
  }
  const professorAppointments = appointments.filter(
    (app) => app.professorId === parseInt(professorId)
  );
  res.status(200).json({ appointments: professorAppointments });
};

// Cancel an appointment
exports.cancelAppointment = (req, res) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const index = appointments.findIndex((app) => app.id === appointmentId);
  if (index === -1) {
    return res.status(404).json({ error: "Appointment not found" });
  }
  appointments.splice(index, 1); // Remove the appointment
  res.status(200).json({ message: "Appointment cancelled successfully" });
};
