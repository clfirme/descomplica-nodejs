// versao do professor
/*
import express from "express";

let router = express.Router();

export default router();*/

import express from "express";
import PacientController from "../controllers/PacientController.js";

const router = express.Router();

// Basic CRUD routes
router.get("/pacients", PacientController.listAll);
router.get("/pacients/:id", PacientController.findById);
router.post("/pacients", PacientController.create);
router.put("/pacients/:id", PacientController.update);
router.delete("/pacients/:id", PacientController.delete);

// Specialized routes
router.get("/pacients/:id/medical-history", PacientController.getMedicalHistory);
router.get("/pacients/:id/prescriptions", PacientController.getPrescriptions);
router.get("/pacients/:id/appointments", PacientController.getAppointments);
router.get("/pacients/search", PacientController.search);

export default router;