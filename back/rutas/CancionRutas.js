const express = require('express');
const CancionControl = require('../control/CancionControl');

const multipart = require('connect-multiparty');

const subCanDirectorio = multipart({uploadDir : './archivos/canciones'});

var api = express.Router();

api.post('/nuevoAlbum',CancionControl.AgregarAlbum);

api.put('/subirCanciones/:id',subCanDirectorio, CancionControl.LlenarAlbum);
api.get('/ObtenerCaratula/:imageFile', CancionControl.mostrarArchivo);
api.post('/buscarAlbum', CancionControl.BuscarAlbum);
api.put('/actualizarAlbum/:id',CancionControl.ModificarAlbum);
api.delete('/eliminarAlbum/:id',CancionControl.EliminarAlbum);
module.exports = api;