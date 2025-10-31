const Tarea = require('../models/Tarea');

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
  }
};

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la tarea', error });
  }
};

// Actualizar una tarea por ID
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la tarea', error });
  }
};

// Eliminar una tarea por ID
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la tarea', error });
  }
};
