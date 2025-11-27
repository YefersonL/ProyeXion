// src/controllers/tareaController.js
const Tarea = require('../models/Tarea');

// 📘 Obtener todas las tareas del usuario autenticado
exports.obtenerTareas = async (req, res) => {
  try {
    // Solo devuelve tareas creadas por el usuario logueado, incluyendo datos del proyecto
    const tareas = await Tarea.find({ usuario: req.user.id }).populate('proyecto', 'nombre estado');
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
  }
};

// 🟢 Crear una nueva tarea asociada al usuario autenticado
exports.crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      proyecto: req.body.proyecto || null, // opcional
      usuario: req.user.id // se toma del token validado
    });

    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la tarea', error });
  }
};

// 🟡 Actualizar una tarea (solo si pertenece al usuario autenticado)
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id, usuario: req.user.id },
      req.body,
      { new: true }
    );

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada o no autorizada.' });
    }

    res.json({ mensaje: 'Tarea actualizada correctamente', tarea });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la tarea', error });
  }
};

// 🔴 Eliminar una tarea (solo si pertenece al usuario autenticado)
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada o no autorizada.' });
    }

    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar la tarea', error });
  }
};
