require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const routesBasic = require('./routers/router')
const routesCategorias = require("./routers/route_categorias.js");
const routesUsuario = require("./routers/route_usuario.js");

const path = require('path');

require('./Databases/connection_mongo.js')

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));  
app.use(express.json())
app.use(morgan('dev'))
app.use(cors()) 

// Rutas
app.use('/api/peliculas' , routesBasic )
app.use("/api/categorias", routesCategorias);
app.use("/api/usuario", routesUsuario);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });
app.get('/CrearPeli', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

let visitCount = 0;

app.get('/', (req, res) => {
    visitCount++;
    res.sendFile(path.join(__dirname, 'views', 'index.html'), {
        headers: {
            'X-Visit-Count': visitCount // Enviar el contador como header
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
