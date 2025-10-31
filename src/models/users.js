const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Necesario para hashear la contraseña

// Definición de Roles del Sistema 
const validRoles = ['Administrador', 'Líder de Proyecto', 'Miembro de Equipo', 'Observador'];

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        // Validación de formato de correo (opcional pero recomendado)
        match: [/.+@.+\..+/, "Por favor, introduce un correo electrónico válido"]
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
        type: String,
        enum: validRoles, // Asegura que solo se usen roles válidos
        default: 'Miembro de Equipo'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// PRE-SAVE HOOK: HASH de la Contraseña
// Antes de guardar un usuario, si la contraseña ha sido modificada (o es nueva), la hashea.
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Método para COMPARAR Contraseñas
// Se puede usar en el controlador para verificar el login.
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);