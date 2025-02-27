// versao do professor
/*
import express from "express";

let router = express.Router();

export default router();*/

import express from "express";
import PrescriptionController from "../controllers/PrescriptionController.js";

const router = express.Router();

// Basic CRUD routes
router.get("/prescriptions", PrescriptionController.listAll);
router.get("/prescriptions/:id", PrescriptionController.findById);
router.post("/prescriptions", PrescriptionController.create);
router.put("/prescriptions/:id", PrescriptionController.update);
router.delete("/prescriptions/:id", PrescriptionController.delete);

// Specialized routes
router.get("/prescriptions/pacient/:pacientID", PrescriptionController.findByPacient);
router.get("/prescriptions/doctor/:doctorID", PrescriptionController.findByDoctor);
router.get("/prescriptions/medication/:medication", PrescriptionController.findByMedication);
router.post("/prescriptions/:id/dispense", PrescriptionController.registerDispensation);

export default router;