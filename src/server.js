// server.js (Extracto)
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.connection');

const authRoutes = require('./routes/auth.routes'); 
const proyectosRoutes = require('./routes/proyectos');
const tareasRoutes = require('./routes/tarea.routes'); // 👈 agregado

// 2. CARGAR VARIABLES DE ENTORNO
dotenv.config();

// 3. CONEXIÓN A LA BASE DE DATOS
connectDB();

const app = express();

// 5. MIDDLEWARES BÁSICOS
app.use(express.json());

// 6. RUTA DE PRUEBA (HEALTH CHECK)
app.get('/', (req, res) => {
    res.send('Servidor ProyeXión API corriendo exitosamente. Visita /api/auth para las rutas de autenticación.');
});

// 7. MONTAR RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareasRoutes); // 👈 nuevo módulo

// 8. INICIAR EL SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor ProyeXión corriendo en modo ${process.env.NODE_ENV || 'desarrollo'} en el puerto ${PORT}`);
    console.log(`🌐 Accede a la API en: http://localhost:${PORT}`);
});
