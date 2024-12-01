// Mock database for demonstration
// const availabilityData = [];
// const appointments = [];
const { availabilityData, appointments } = require("../utils/sharedData");

// View available time slots for a professor
exports.viewAvailableSlots = (req, res) => {
  const professorId = parseInt(req.params.professorId);

  console.log("Fetching available slots for professor ID:", professorId);
  console.log("Current availability data:", availabilityData);

  const availableSlots = availabilityData.filter(
    (slot) => slot.professorId === professorId && !slot.isBooked
  );

  console.log("Filtered available slots:", availableSlots);

  res.status(200).json({ availableSlots });
};

// Book an appointment with a professor
exports.bookAppointment = (req, res) => {
  const { studentId, professorId, date, timeSlot } = req.body;
  if (!studentId || !professorId || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Mark the slot as booked
  const slotIndex = availabilityData.findIndex(
    (slot) =>
      slot.professorId === parseInt(professorId) &&
      slot.date === date &&
      slot.timeSlot === timeSlot
  );
  if (slotIndex === -1 || availabilityData[slotIndex].isBooked) {
    return res.status(400).json({ error: "Slot not available" });
  }
  availabilityData[slotIndex].isBooked = true;

  // Create an appointment
  const appointment = {
    id: appointments.length + 1,
    studentId,
    professorId,
    date,
    timeSlot,
    status: "confirmed",
  };
  appointments.push(appointment);
  res
    .status(201)
    .json({ message: "Appointment booked successfully", appointment });
};

// View all appointments for the student
exports.viewAppointments = (req, res) => {
  const studentId = req.query.studentId;
  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required" });
  }
  const studentAppointments = appointments.filter(
    (app) => app.studentId === parseInt(studentId)
  );
  res.status(200).json({ appointments: studentAppointments });
};
