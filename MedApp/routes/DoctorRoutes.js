// versao do professor
/*
import express from "express";

let router = express.Router();

export default router();*/

import express from "express";
import DoctorController from "../controllers/DoctorController.js";

const router = express.Router();

// Basic CRUD routes
router.get("/doctors", DoctorController.listAll);
router.get("/doctors/:id", DoctorController.findById);
router.post("/doctors", DoctorController.create);
router.put("/doctors/:id", DoctorController.update);
router.delete("/doctors/:id", DoctorController.delete);

// Specialized routes
router.get("/doctors/specialty/:specialty", DoctorController.findBySpecialty);
router.get("/doctors/available/:date", DoctorController.findAvailableByDate);
router.get("/doctors/:id/appointments", DoctorController.getAppointments);
router.post("/doctors/authenticate", DoctorController.authenticate);

export default router;
