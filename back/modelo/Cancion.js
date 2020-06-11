const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CancionesSchema = new Schema({
    caratula : String,
    album : String,
    artista : String,
    titulo : Array,
    canciones: Array
})

module.exports = mongoose.model('Cancion',CancionesSchema);