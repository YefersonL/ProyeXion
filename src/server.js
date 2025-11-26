// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.connection");

const tareaRoutes = require("./routes/tarea.routes");
const proyectoRoutes = require("./routes/proyectos");
const authRoutes = require("./routes/auth.routes");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rutas públicas
app.use("/api/auth", authRoutes); // login SIN TOKEN

// Rutas protegidas
app.use("/api/tareas", tareaRoutes);
app.use("/api/proyectos", proyectoRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Servidor OK");
});

// ❗ Ruta 404 para evitar usar "*"
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
