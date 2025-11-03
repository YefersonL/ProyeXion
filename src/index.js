// src/index.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.connection");
const tareaRoutes = require("./routes/tarea.routes");
const proyectoRoutes = require("./routes/proyectos");
const authRoutes = require("./routes/auth.routes");

dotenv.config(); // Carga las variables del .env

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas principales
app.use("/api/tareas", tareaRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/auth", authRoutes);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
