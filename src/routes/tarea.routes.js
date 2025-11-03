// src/routes/tarea.routes.js
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { protect } = require('../utils/authMiddleware'); // 🧩 Usa tu middleware existente

// Rutas protegidas por token
router.get('/', protect, tareaController.obtenerTareas);
router.post('/', protect, tareaController.crearTarea);
router.put('/:id', protect, tareaController.actualizarTarea);
router.delete('/:id', protect, tareaController.eliminarTarea);

module.exports = router;
