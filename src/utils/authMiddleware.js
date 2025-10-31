const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Para verificar si el usuario existe

exports.protect = async (req, res, next) => {
    let token;

    // 1. Verificar si el token existe en el header (Bearer Token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token de la cadena: "Bearer TOKEN_AQUÍ"
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificar y decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Adjuntar el usuario a la petición (excluyendo la contraseña)
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Continuar con la siguiente función (el controlador)
            next();
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            res.status(401).json({ message: 'No autorizado, token fallido o expirado.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no se proporcionó token.' });
    }
};