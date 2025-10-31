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
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
