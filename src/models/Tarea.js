// src/models/Tarea.js
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  descripcion: {
    type: String,
    default: '',
  },
  completada: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  proyecto: { // Relación opcional con Proyecto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',
    required: false
  },
  usuario: { // 🔐 Relación con el usuario autenticado
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
