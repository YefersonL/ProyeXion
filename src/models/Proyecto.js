const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date  },
  fechaFin: { type: Date },
  estado: { type: String, required: true  },
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
