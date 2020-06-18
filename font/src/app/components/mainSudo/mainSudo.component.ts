import { Component } from '@angular/core';
import { Cancion } from '../../modelo/Cancion';
import { CancionService } from 'src/app/service/cancion.service';

import Swal from 'sweetalert2';

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
                
                let mensaje = response.message;
             
                this.musica = album;
                if(!this.musica._id){
                    Swal.fire({
                        title: 'Erro!',
                        text: `No se ha podido guardar el album`,
                        imageUrl: '../../assets/img/flores.jpeg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image', 
                        confirmButtonColor: '#F76363',
                        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                    }).finally;
                } else {
                    Swal.fire({
                        title: 'Genial!',
                        text: `Se ha creado un nuevo álbum :D`,
                        imageUrl: '../../assets/img/flores.jpeg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image', 
                        confirmButtonColor: '#F76363',
                        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                    }).finally
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
            Swal.fire({
                title: 'Fabuloso!',
                text: `Se ha encontrado tu búsqueda`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
               localStorage.setItem('album', JSON.stringify(busqueda));
               window.location.reload();
           } else {
            Swal.fire({
                title: 'Oh no.....',
                text: `No se encontró tu búsqueda D:`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
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
            Swal.fire({
                title: 'Magnífico!',
                text: `Se ha subido tu archivo`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
               localStorage.setItem('album', JSON.stringify(response.album));
               var rutaCaratula = this.url + 'ObtenerCaratula/' + this.datosAlbum.caratula;
               document.getElementById('fotoP').setAttribute('src', rutaCaratula);
               
           } else {
            Swal.fire({
                title: 'Formato no válido',
                text: `Debes subir una imagen o una canción `,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
           }
       })
   }

   actualizar(){
    this.cancioneServicio.ActualizarAlbum(this.album._id, this.musica).subscribe((response : any ) =>{
        let resultado = response.album;
        let mensaje = response.message;
       
        if(resultado){
            Swal.fire({
                title: 'Se ha actualizado tu álbum',
                text: `Ingresa canciones ahora :D`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
            localStorage.setItem('album', JSON.stringify(resultado));
        } else {
            Swal.fire({
                title: 'Lo sentimos!',
                text: `Intenta subir el álbum nuevamente`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
        }
    })
   }

   eliminar(){
       this.cancioneServicio.EliminarAlbum(this.album._id).subscribe((response : any) =>{
           let borrado = response.borrado;
           let mensaje = response.message;
           if(borrado){
            Swal.fire({
                title: 'Adiós!',
                text: `Se ha eliminado el álbum`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
               localStorage.setItem('album', JSON.stringify(this.musica));
               window.location.reload();
           }else {
            Swal.fire({
                title: 'Lo sentimos!',
                text: `No se pudo eliminar el álbum escogido`,
                imageUrl: '../../assets/img/flores.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image', 
                confirmButtonColor: '#F76363',
                backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally
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