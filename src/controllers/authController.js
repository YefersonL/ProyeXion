const User = require('../models/users');
const jwt = require('jsonwebtoken'); // Para crear tokens de sesión
const { ObjectId } = require('mongoose').Types; // Utilidad para validar IDs

// Función auxiliar para generar el token JWT
const createToken = (id) => {
    // Asegúrate de tener una variable de entorno JWT_SECRET en tu archivo .env
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // El token expira en 1 día
    });
};

// 1. INICIAR SESIÓN (login)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 2. Comparar contraseña (usando el método definido en el modelo)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 3. Generar JWT y enviarlo
        const token = createToken(user._id);

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token // El cliente (Front-end Angular) debe almacenar este token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor durante el inicio de sesión.' });
    }
};

// 2. CERRAR SESIÓN (logout)
// En una API REST con JWT (Stateless), el "cierre de sesión" se hace del lado del cliente.
// El cliente simplemente elimina el token JWT almacenado.
// Este endpoint solo sirve como una confirmación o para limpiar cookies de sesión si se usan.
exports.logout = (req, res) => {
    // Si estás usando Cookies, las borrarías aquí.
    // Ej: res.cookie('jwt', '', { maxAge: 1 }).send({ message: 'Sesión finalizada' });

    // Dado que el cliente usa el token del header, solo enviamos una confirmación.
    res.status(200).json({ message: 'Sesión finalizada correctamente. El token debe ser eliminado por el cliente.' });
};

//Elimiar Usuario
exports.deleteUser = async (req, res) => {
    // ⚠️ La eliminación de usuarios generalmente DEBE ser exclusiva del Administrador.
    // Asumimos que el middleware 'protect' ha inyectado el usuario logueado en req.user
    
    // Opcional: Chequeo de rol (solo si quieres que solo el Admin pueda eliminar)
    // if (req.user.role !== 'Administrador') {
    //     return res.status(403).json({ message: 'Prohibido. Solo los administradores pueden eliminar usuarios.' });
    // }

    const { id } = req.params; 
    
    // 1. Validar el formato del ID
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de usuario no válido.' });
    }

    try {
        // 2. Buscar y eliminar por ID
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            // 3. Manejar caso de usuario no encontrado
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        // 4. Respuesta de éxito
        res.status(200).json({ message: `Usuario ${user.name} eliminado exitosamente.` });
    } catch (error) {
        res.status(500).json({ message: 'Error interno al eliminar el usuario.', error: error.message });
    }
};

// 3. EDITAR PERFIL (editProfile)
exports.editProfile = async (req, res) => {
    // req.user.id es proporcionado por el middleware de autenticación (authMiddleware)
    const userId = req.user.id; 
    const { name, email, oldPassword, newPassword } = req.body;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID de usuario no válido.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // 1. Actualizar campos (nombre, email)
        if (name) user.name = name;
        if (email) user.email = email;

        // 2. Manejar cambio de contraseña
        if (newPassword) {
            // Verificar la contraseña antigua antes de cambiar
            if (!oldPassword) {
                 return res.status(400).json({ message: 'Se requiere la contraseña actual para establecer una nueva.' });
            }
            const isMatch = await user.comparePassword(oldPassword);
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña actual incorrecta.' });
            }
            // Si es correcta, Mongoose se encarga de hashear la newPassword en el 'pre-save hook'
            user.password = newPassword; 
        }

        await user.save();

        res.status(200).json({ 
            message: 'Datos de perfil actualizados en la base de datos.', 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });

    } catch (error) {
        // Error de validación de Mongoose, por ejemplo, email ya existe
        if (error.code === 11000) {
             return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }
        res.status(500).json({ message: 'Error al actualizar el perfil.', error: error.message });
    }
};

// **[ADICIONAL] Función de registro rápido para inicializar el sistema**
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        const token = createToken(user._id);

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente.',
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        });
    } catch (error) {
        res.status(400).json({ message: 'Error en el registro de usuario.', error: error.message });
    }
};