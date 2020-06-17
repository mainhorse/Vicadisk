import { Component } from '@angular/core';
import { Cancion } from '../../modelo/Cancion';
import { CancionService } from 'src/app/service/cancion.service';


@Component({
    selector: ' app-mainSudo',
    templateUrl: 'mainSudo.component.html',
    styleUrls: ['mainSudo.component.css']
})

export class mainSudoComponent{
    imgAlbum = 'assets/img/nuevoAlbum.png';
    caratula = 'assets/img/acetato.png';
    casset = 'assets/img/casete.png';
    diskman = 'assets/img/diskman.png';
    walkman = 'assets/img/walkman.png';
    public musica : Cancion;
    public album : Cancion;
    public archivoSubir : File;
    public url : String;
    public datosAlbum : Cancion;

    constructor(
        private cancioneServicio : CancionService
    ){
        this.musica = new Cancion('','','','',[],[]);
        this.album = JSON.parse(localStorage.getItem('album'));
        this.url = cancioneServicio.url;
    }

    ngOnInit(): void{
        this.datosAlbum = JSON.parse(localStorage.getItem('album'));
    }
    
    subirArchivo(fileInput : any){
        this.archivoSubir = <File>fileInput.target.files[0];
    }    

    crearAlbum(){
        this.cancioneServicio.subirAlbum(this.musica).subscribe(
            (response : any) =>{
                let album = response.album;
                console.log(album);
                let mensaje = response.message;
                console.log(mensaje);
                this.musica = album;
                if(!this.musica._id){
                    alert('Album no guardado');
                } else {
                    alert(`Se ha guardado el album ${this.musica.album}`);
                    localStorage.setItem('album', JSON.stringify(album));
                    window.location.reload();
                }
            }, error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
                console.log(errorMensaje);
            }
        })
    
    }

    buscarAlbum(){
       this.cancioneServicio.buscarAlbum(this.musica).subscribe((response : any) =>{
           let busqueda = response.busqueda;
           
           if(response.busqueda){
               alert("se encontraron concidencias");
               localStorage.setItem('album', JSON.stringify(busqueda));
               window.location.reload();
           } else {
               alert("no se encontraron resultados");
           }
       }, error => {
           var errorMensaje = <any>error;
           if(errorMensaje != null){
               console.log(errorMensaje);
           }
       }
       )
   } 

   subirCancion(){
       
       this.cancioneServicio.CancionNueva(this.archivoSubir, this.album._id, this.musica.titulo).subscribe((response : any)=>{
           if(response.album){
            let mensaje = response.message;
               alert(mensaje);
               localStorage.setItem('album', JSON.stringify(response.album));
               var rutaCaratula = this.url + 'ObtenerCaratula/' + this.datosAlbum.caratula;
               document.getElementById('fotoP').setAttribute('src', rutaCaratula);
               
           } else {
               alert('Los datos no son validos');
           }
       })
   }

   actualizar(){
    this.cancioneServicio.ActualizarAlbum(this.album._id, this.musica).subscribe((response : any ) =>{
        let resultado = response.album;
        let mensaje = response.message;
        console.log(resultado)
        if(resultado){
            alert(mensaje);
            localStorage.setItem('album', JSON.stringify(resultado));
        } else {
            alert("No se pudo actualizar el album");
        }
    })
   }

   eliminar(){
       this.cancioneServicio.EliminarAlbum(this.album._id).subscribe((response : any) =>{
           let borrado = response.borrado;
           let mensaje = response.message;
           if(borrado){
               alert(mensaje);
               localStorage.setItem('album', JSON.stringify(this.musica));
               window.location.reload();
           }else {
               alert(mensaje);
           }
       },error =>{
           var errorMensaje = <any>error;
           if(errorMensaje != null){
               console.log(errorMensaje);
           }
       }
       
       )
       
   }

    mostrarInf(){
        
        var containerAlbum = document.getElementById('conAlbum');
        var containerBanda = document.getElementById('conBanda');
        var containerCanciones = document.getElementById('conCanciones');
        containerAlbum.innerHTML = "";
        containerBanda.innerHTML = "";
        containerCanciones.innerHTML = "";
        
        var datos = JSON.parse(localStorage.getItem('album'));
        
        var album = datos.album;
        var artista = datos.artista;
        var titulos = datos.titulo; 
        console.log(titulos.length) // este es el que importa

        var titulo = document.createElement('div');
        var conTitulo = document.createTextNode('Album = ' + album);
        titulo.appendChild(conTitulo);

        var banda = document.createElement('div');
        var conBanda = document.createTextNode('Artista =' + artista);
        banda.appendChild(conBanda);
        
        var listas = document.createElement('div');
        var conLista = document.createTextNode(titulos);
        listas.appendChild(conLista);

        containerCanciones.appendChild(listas)  
        containerAlbum.appendChild(titulo);
        containerBanda.appendChild(banda)

        titulo.setAttribute("class","datosNuevos");
        banda.setAttribute("class","datosNuevos");        
    }
    
}