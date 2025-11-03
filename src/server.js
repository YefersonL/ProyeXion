// server.js (Extracto)
const express = require('express');
const dotenv = require('dotenv');
// const connectDB = require('./config/db.connection'); // Necesitas la conexión a DB
const authRoutes = require('./routes/auth.routes'); // Importar rutas de auth

dotenv.config();
// connectDB(); // Conectar a la base de datos

const app = express();

// Middlewares
app.use(express.json()); // Body Parser para peticiones JSON

// Montar Rutas
app.use('/api/auth', authRoutes); // Todas las rutas de auth usan el prefijo /api/auth

// Iniciar Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));