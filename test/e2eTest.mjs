import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app"; // Import the app

chai.use(chaiHttp);
const { expect } = chai;

describe("End-to-End Test for College Appointment System", () => {
  it("Student should be able to view available slots", (done) => {
    chai
      .request(app)
      .get("/students/availability/1") // Replace with a valid professorId
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.availableSlots).to.be.an("array");
        done();
      });
  });

  it("Student should be able to book an appointment", (done) => {
    chai
      .request(app)
      .post("/students/appointments")
      .send({
        studentId: 1,
        professorId: 1,
        date: "2024-12-01",
        timeSlot: "10:00-11:00",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.appointment).to.have.property("status", "confirmed");
        done();
      });
  });

  it("Professor should be able to set availability", (done) => {
    chai
      .request(app)
      .post("/professors/availability")
      .send({
        professorId: 1,
        date: "2024-12-01",
        timeSlot: "10:00-11:00",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Availability set successfully");
        done();
      });
  });
});
