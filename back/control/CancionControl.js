const Cancion = require('../modelo/Cancion');
const fs = require('fs');
const path = require('path');

function AgregarAlbum(req,res){
    var cancion = new Cancion();
    var parametros = req.body;
    
    cancion.caratula = parametros.caratula;
    cancion.album = parametros.album;
    cancion.artista = parametros.artista;
    cancion.titulo = [];
    cancion.canciones = [];
    cancion.save((err, AlbumNuevo)=>{
        if(err){
            res.status(500).send({message : 'Error del servidor'});
        } else{
            if(!AlbumNuevo){
                res.status(200).send({message : 'No fue posible crear el album'});
            } else{
                res.status(200).send({
                    message : 'Album creado',
                    album : AlbumNuevo
                })
            }
        }
    })

}

function ModificarAlbum(req,res){
    
}

module.exports = {
    AgregarAlbum
}