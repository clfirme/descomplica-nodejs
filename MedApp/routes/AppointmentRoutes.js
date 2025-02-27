// versao do professor
/*
import express from "express";

let router = express.Router();

export default router();*/

import express from "express";
import AppointmentController from "../controllers/AppointmentController.js";

const router = express.Router();

// Basic CRUD routes
router.get("/appointments", AppointmentController.listAll);
router.get("/appointments/:id", AppointmentController.findById);
router.post("/appointments", AppointmentController.create);
router.put("/appointments/:id", AppointmentController.update);
router.delete("/appointments/:id", AppointmentController.delete);

// Specialized routes
router.get("/appointments/doctor/:doctorID", AppointmentController.findByDoctor);
router.get("/appointments/pacient/:pacientID", AppointmentController.findByPacient);
router.get("/appointments/date/:date", AppointmentController.findByDate);
router.get("/appointments/check-availability", AppointmentController.checkAvailability);

export default router;