import express from "express";
import {
  crearTarea,
  obtenerTareas,
  asignarResponsable,
  cambiarEstado,
  eliminarTarea,
} from "../controllers/tareaController.js";

import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

// CRUD básico de tareas
router.post("/", authMiddleware, crearTarea);
router.get("/", authMiddleware, obtenerTareas);
router.put("/:id/responsable", authMiddleware, asignarResponsable);
router.put("/:id/estado", authMiddleware, cambiarEstado);
router.delete("/:id", authMiddleware, eliminarTarea);

export default router;
