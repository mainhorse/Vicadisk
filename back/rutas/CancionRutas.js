const express = require('express');
const CancionControl = require('../control/CancionControl');

const multipart = require('connect-multiparty');

const subCanDirectorio = multipart({uploadDir : '../archivos/canciones'});

var api = express.Router();

api.post('/nuevoAlbum',CancionControl.AgregarAlbum);

module.exports = api;