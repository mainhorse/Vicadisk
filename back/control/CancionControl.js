const Cancion = require('../modelo/Cancion');
const fs = require('fs');
const path = require('path');

function AgregarAlbum(req,res){
    var cancion = new Cancion();
    var parametros = req.body;
    
    cancion.caratula = parametros.caratula;
    cancion.album = parametros.album;
    cancion.artista = parametros.artista;
    cancion.titulo = parametros.titulo;
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

function LlenarAlbum(req,res){
    
    var albumId = req.params.id;
    var nomtitulo = req.body.titulo
    var nombreArchivo = "no has subido una cancion";

    if(req.files){ 
        
     var rutaArchivo = req.files.canciones.path;     
     var partirArchivo = rutaArchivo.split('\\');
     var nombreArchivo = partirArchivo[2];
     var extencionMu = nombreArchivo.split('\.');
     var extencionArchivo = extencionMu[1];

    if(extencionArchivo == 'png' || extencionArchivo == 'jpg'|| extencionArchivo == 'jpeg' ){
        Cancion.findByIdAndUpdate(albumId , {caratula : nombreArchivo }, (err, nuevaCaratula)=>{
            if(err){
                res.status(500).send({message : "Error en el servidor"});
            } else {
               if(!nuevaCaratula){
                res.status(200).send({ message : "imagen no valida"});
                } else{
                    res.status(200).send({
                        message : "Caratula nueva",
                        album : nuevaCaratula
                    })
                }
            }
        }) 
    } else {
        if(extencionArchivo == 'mp3'){
            Cancion.findByIdAndUpdate(albumId, {$push : { canciones : nombreArchivo }}, (err, canNueva)=>{
                console.log(canNueva.id)
                if(err){
                    req.status(500).send({message : "error en el servidor"});
                } else{
                    if(!canNueva){
                        req.status(200).send({ message : 'no se pudo guardar la cancion'});
                    } else {
                        Cancion.findByIdAndUpdate(albumId, {$push : {titulo : nomtitulo }}, (err, cancionNueva) =>{
                            res.status(200).send({
                                message : "Cancion guardada",
                                album : cancionNueva                            
                            })
                        })
                       
                    }
                }
            } )
        } else {
            res.status(200).send({message : "Formato invalido"});
        }
    } 
    }
     
   
}

function BuscarAlbum(req,res){
    var parametros = req.body;
    album = parametros.album;
    artista = parametros.artista;
    Cancion.findOne({album : album , artista : artista }, (err , Albunes )=>{
        if(err){
            res.status(500).send({ message : "error del servidor"});
        } else {
            if(!Albunes){
                res.status(200).send({ message : "No se encontraron concidencias"});
            } else {
                res.status(200).send({
                    message :" Se encontraron concidencias",
                    busqueda : Albunes
                })
            }
        }
    })
}

function BuscarArtista(req,res){
    var parametros = req.body;
    artista = parametros.artista;
    Cancion.find({artista : artista }, (err , Albunes )=>{
        if(err){
            res.status(500).send({ message : "error del servidor"});
        } else {
            if(!Albunes){
                res.status(200).send({ message : "No se encontrar el artista"});
            } else {
                res.status(200).send({
                    message :" Se encontraron concidencias",
                    busqueda : Albunes
                })
            }
        }
    })
}

function ModificarAlbum(req,res){
    var albumId = req.params.id;
    var albumNuevo = req.body.album;
    var artistaNuevo = req.body.artista;   

    Cancion.findByIdAndUpdate(albumId, {album : albumNuevo , artista : artistaNuevo }, (err, AlbumActualizado)=>{
        if(err){
            res.status(500).send({message : "Error en el servidor"});
        } else {
            if(!AlbumActualizado){
                res.status(200).send({ message : "No se pudo actualizar el album"});
            } else {
                res.status(200).send({
                    message : "Album actualizado",
                    album : AlbumActualizado
                })
            }
        }
    },);
}

function EliminarAlbum(req,res){
    var idCancion = req.params.id;

    Cancion.findByIdAndDelete(idCancion, (err, AlbumEliminado) =>{
        if(err){
            res.status(500).send({ message : "Error en el serivdor"});
        } else {
            if(!AlbumEliminado){
                res.status(200).send({message : "No se ha seleccionado un album para eliminar"});
            } else {
                res.status(200).send({
                    message : "Album Eliminado",
                    borrado :AlbumEliminado
                })
            }
        }
    })
}

function mostrarArchivo(req, res){
    // pedir el archivo que queremos mostrar

    var archivo = req.params.imageFile;
    console.log(`el archivo es : ${archivo}`);
    // Ubicacion del archivo
    var ruta = './archivos/canciones/' + archivo;

    // validar si existe o no
    // fs.exists('la ruta del archivo'. (exiate)=>{})
    fs.exists(ruta,(exist)=>{
        if(exist){
            res.sendFile(path.resolve(ruta));
        } else{
            res.status(200).send({message: "imagen no encontrada"});
        }
    })
}

function buscarCancion(req,res){
    var archivo = req.params.cancion;
    console.log(archivo);
    // Ubicacion del archivo
    var ruta = './archivos/canciones/' + archivo;

    // validar si existe o no
    // fs.exists('la ruta del archivo'. (exiate)=>{})
    fs.exists(ruta,(exist)=>{
        if(exist){
            res.sendFile(path.resolve(ruta));
        } else{
            res.status(200).send({message: "cancion no disponible"});
        }
    })
}

module.exports = {
    AgregarAlbum,
    LlenarAlbum,
    BuscarAlbum, 
    buscarCancion,  
    BuscarArtista, 
    ModificarAlbum,
    EliminarAlbum,
    mostrarArchivo
}