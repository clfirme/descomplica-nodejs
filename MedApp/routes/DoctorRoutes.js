// versao do professor
/*
import express from "express";

let router = express.Router();

export default router();*/

import express from "express";
import DoctorController from "../controllers/DoctorController.js";
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Basic CRUD routes
// Rotas públicas (não precisam de autenticação)
router.get("/doctors", DoctorController.listAll);
router.post("/doctors/login", DoctorController.login);
router.post("/doctors", DoctorController.create);

// Rotas protegidas (requerem autenticação)
router.get("/doctors/:id", verifyToken, DoctorController.findById);
router.put("/doctors/:id", verifyToken, DoctorController.update);
router.delete("/doctors/:id", verifyToken, DoctorController.delete);

// Specialized routes
router.get("/doctors/specialty/:specialty", DoctorController.findBySpecialty);
router.get("/doctors/available/:date", DoctorController.findAvailableByDate);
router.get("/doctors/:id/appointments", DoctorController.getAppointments);
router.post("/doctors/authenticate", DoctorController.authenticate);

/* Rotas sem a implementação da autenticação 
router.get("/doctors", DoctorController.listAll);
router.get("/doctors/:id", DoctorController.findById);
router.put("/doctors/:id", DoctorController.update);
router.delete("/doctors/:id", DoctorController.delete); */

export default router;
