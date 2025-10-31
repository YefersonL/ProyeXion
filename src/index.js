const express = require('express');
const parser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = 5000;

// Rutas
const Routes = require("./routes/");
const authRoutes = require("./routes/authentication");

// 🟢 1️⃣ Middlewares: deben ir antes de las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// También puedes mantener body-parser (aunque Express ya lo incluye)
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// 🟢 2️⃣ Registrar las rutas después
app.use("/api", authRoutes);
app.use("/api", Routes);

// 🟢 3️⃣ Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conexión exitosa con MongoDB"))
  .catch((error) => console.log(" Error en la conexión:", error));

// 🟢 4️⃣ Levantar servidor
app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});
