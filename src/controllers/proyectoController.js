const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// Crear
exports.crearProyecto = async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);
    await proyecto.save();
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar
exports.listarProyectos = async (req, res) => {
  const proyectos = await Proyecto.find();
  res.json(proyectos);
};

// Obtener por ID
exports.obtenerProyecto = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);
  res.json(proyecto);
};

// Editar
exports.actualizarProyecto = async (req, res) => {
  const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(proyecto);
};

// Eliminar
exports.eliminarProyecto = async (req, res) => {
  await Proyecto.findByIdAndDelete(req.params.id);
  res.json({ message: 'Proyecto eliminado' });
};
