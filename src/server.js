// 1. IMPORTAR MÓDULOS NECESARIOS
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.connection'); // Necesitarás crear este archivo

// Importar rutas de autenticación (que creaste antes)
const authRoutes = require('./routes/auth.routes'); 
const proyectosRoutes = require('./routes/proyectos');


// 2. CARGAR VARIABLES DE ENTORNO
// Esto permite acceder a MONGODB_URI y PORT desde process.env
dotenv.config();

// 3. CONEXIÓN A LA BASE DE DATOS
// Llama a la función que conecta a MongoDB
connectDB();

// 4. INICIALIZAR LA APLICACIÓN
const app = express();

// 5. MIDDLEWARES BÁSICOS
// Permite que Express maneje peticiones con cuerpo JSON
app.use(express.json());

// 6. RUTA DE PRUEBA (HEALTH CHECK)
// Para verificar que el servidor está respondiendo
app.get('/', (req, res) => {
    res.send('Servidor ProyeXión API corriendo exitosamente. Visita /api/auth para las rutas de autenticación.');
});

// 7. MONTAR RUTAS DE AUTENTICACIÓN
app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectosRoutes);





// 8. INICIAR EL SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Servidor ProyeXión corriendo en modo ${process.env.NODE_ENV || 'desarrollo'} en el puerto ${PORT}`);
    console.log(` Accede a la API en: http://localhost:${PORT}`);
});