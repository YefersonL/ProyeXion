const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { protect } = require('../utils/authMiddleware');

router.get('/', protect, tareaController.obtenerTareas);
router.post('/', protect, tareaController.crearTarea);
router.put('/:id', protect, tareaController.actualizarTarea);
router.delete('/:id', protect, tareaController.eliminarTarea);

module.exports = router;
