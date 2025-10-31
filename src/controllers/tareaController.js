import Tarea from "../models/Tarea.js";

// Crear una nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error });
  }
};

// Obtener todas las tareas (o por proyecto)
export const obtenerTareas = async (req, res) => {
  try {
    const { proyectoId } = req.query;
    const query = proyectoId ? { proyecto: proyectoId } : {};
    const tareas = await Tarea.find(query).populate("responsable", "nombre email");
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error });
  }
};

// Asignar responsable
export const asignarResponsable = async (req, res) => {
  try {
    const { id } = req.params;
    const { responsable } = req.body;

    const tarea = await Tarea.findByIdAndUpdate(
      id,
      { responsable },
      { new: true }
    ).populate("responsable", "nombre email");

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al asignar responsable", error });
  }
};

// Cambiar estado
export const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const tarea = await Tarea.findByIdAndUpdate(id, { estado }, { new: true });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado", error });
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    await Tarea.findByIdAndDelete(id);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error });
  }
};
