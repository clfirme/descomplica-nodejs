import express from "express";
import appointmentRoutes from "./AppointmentRoutes.js";
import doctorRoutes from "./DoctorRoutes.js";
import pacientRoutes from "./PacientRoutes.js";
import prescriptionRoutes from "./PrescriptionRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Hello!");
  res.status(200).json({message: "Hello!"});
});

router.use(appointmentRoutes);
router.use(doctorRoutes);
router.use(pacientRoutes);
router.use(prescriptionRoutes);

export default router;