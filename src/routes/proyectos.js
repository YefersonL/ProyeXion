const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// Crear
router.post('/', async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);
    await proyecto.save(); // await Espera a que esta operación termine antes de seguir con la siguiente línea.
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Listar
router.get('/', async (req, res) => {
  const proyectos = await Proyecto.find();
  res.json(proyectos);
});

// Obtener por ID
router.get('/:id', async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);
  res.json(proyecto);
});


