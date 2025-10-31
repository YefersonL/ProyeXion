const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../utils/authMiddleware'); // Importar el middleware

// Rutas de Autenticación
// POST /api/auth/register - [ADICIONAL] Registro de un nuevo usuario
router.post('/register', authController.register);

// POST /api/auth/login - 1. INICIAR SESIÓN
router.post('/login', authController.login);

// GET /api/auth/logout - 2. CERRAR SESIÓN
router.get('/logout', authController.logout);

// PUT /api/auth/profile - 3. EDITAR PERFIL (Requiere token JWT para acceder)
router.put('/profile', protect, authController.editProfile);

module.exports = router;