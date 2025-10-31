const express = require('express');
const router = express.Router();
const Proyecto = require('../controllers/proyectoController');

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


// Editar
router.put('/:id', async (req, res) => {
  const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(proyecto);
});

// Eliminar
router.delete('/:id', async (req, res) => {
  await Proyecto.findByIdAndDelete(req.params.id);
  res.json({ message: 'Proyecto eliminado' });
});

module.exports = router;