const express = require('express');
const app = express();
// declaracion de cors 
const cors = require('cors');



// declaracion de la constante de las rutas de usuario
const usuarioRutas = require('./rutas/UsuarioRutas');
const cancionesRutas = require('./rutas/CancionRutas');


// --MIDDLEWARE--

app.use(express.json());
app.use(cors());

// consumo de las rutas
app.use('/api', usuarioRutas);
app.use('/api', cancionesRutas);

// --FIN MIDDLEWARES--


// exportacion del modulo

module.exports = app;