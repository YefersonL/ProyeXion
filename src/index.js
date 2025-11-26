// src/index.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.connection");
const tareaRoutes = require("./routes/tarea.routes");
const proyectoRoutes = require("./routes/proyectos");
const authRoutes = require("./routes/auth.routes");
const cors = require('cors'); // <-- IMPORTANTE

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
