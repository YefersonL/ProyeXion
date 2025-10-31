import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "en progreso", "completada"],
    default: "pendiente",
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto",
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Tarea", tareaSchema);
