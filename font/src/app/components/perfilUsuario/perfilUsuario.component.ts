import { Component } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Cancion } from '../../modelo/Cancion';
import { UsuarioService } from '../../service/usuario.service';
import { CancionService } from '../../service/cancion.service';

import Swal from 'sweetalert2';
@Component({
    selector: 'app-perfilUsuario',
    templateUrl: 'perfilUsuario.component.html',
    styleUrls: ['perfilUsuario.component.css']

})

export class perfilUsuarioComponent{

    //Declaramos la variable usuarioActualizar
    public usuarioActualizar : Usuario;
    // Declarar la variable archivoSubir de tipo File
    public archivoSubir : File;
    // Declarar la variable identidad;
    public identidad;
    logo = 'assets/img/logo_vicadisk.png';
    foto = 'assets/img/datPer.png';
    public url: String; 
    public busAlbum : Cancion;
    constructor(
        private usuarioService : UsuarioService,
        private cancionService : CancionService
    ){
        this.url = usuarioService.url;
        this.busAlbum = new Cancion('','','','',[],[]);
    }
    
    ngOnInit(): void{
        this.usuarioActualizar = JSON.parse(localStorage.getItem('sesion'));
        this.identidad = this.usuarioService.obtenerNombreUsuario();
    }
    //metodo subirArchivo
    subirArchivo(fileInput : any){
        this.archivoSubir = <File>fileInput.target.files[0];
    }    

    buscarArtista(){
        console.log(this.busAlbum.artista);
        this.cancionService.buscarArtista(this.busAlbum).subscribe((response : any) =>{ 
            var resultado = response.busqueda;
            if(resultado == ''){
                Swal.fire({
                    title: 'Lo sentimos :c',
                    text: `Tu artísta no esta disponible en nuestro sistema por ahora`,
                    imageUrl: '../../assets/img/flores.jpeg',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image', 
                    confirmButtonColor: '#F76363',
                    backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                }).finally
            }else if(resultado){
                localStorage.setItem('album', JSON.stringify(response.busqueda));
                window.location.reload();
            }
        }, error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
                Swal.fire({
                    title: 'Lo sentimos :c',
                    text: `Tu artísta no esta disponible en nuestro sistema por ahora`,
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
    //actualizar usuarios
    actualizarUsuario(){
        this.usuarioService.editarUsuario(this.usuarioActualizar._id, this.usuarioActualizar).subscribe(
            (response : any) => {
                if(response.usuario){
                    Swal.fire({
                        title: 'Se han modificado tus datos!',
                        text: `Disfruta tu nueva identidad`,
                        imageUrl: '../../assets/img/flores.jpeg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image', 
                        confirmButtonColor: '#F76363',
                        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                    }).finally
                    localStorage.setItem('sesion', JSON.stringify(this.usuarioActualizar));
                    // validacion y consumo del servicio de la carga de imagen
                    if(!this.archivoSubir){
                        Swal.fire({
                            title: 'Se han modificado tus datos!',
                            text: `Disfruta tu nueva identidad`,
                            imageUrl: '../../assets/img/flores.jpeg',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image', 
                            confirmButtonColor: '#F76363',
                            backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                        }).finally
                    } else {
                        Swal.fire({
                            title: 'Imagen actualizada',
                            text: `Tu imagen es ${this.archivoSubir.name}`,
                            imageUrl: '../../assets/img/flores.jpeg',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image', 
                            confirmButtonColor: '#F76363',
                            backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                        }).finally
                        this.usuarioService.cargarImagenUsuario(this.archivoSubir,this.usuarioActualizar._id).subscribe(
                            (result : any) =>{
                                this.usuarioActualizar.imagen = result.imagen;
                                localStorage.setItem('sesion',JSON.stringify(this.usuarioActualizar));

                                // mostrar la imagen
                                let rutaImagen = this.url + 'obtenerImagen/' + this.usuarioActualizar.imagen;
                                document.getElementById('fotUsuario').setAttribute('src', rutaImagen);  
                                                       
                            }
                        )
                    }

                    // cierre validacion
                } else {
                    Swal.fire({
                        title: 'No fue posible actualizar tus datos',
                        text: `Intenta más tarde`,
                        imageUrl: '../../assets/img/flores.jpeg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image', 
                        confirmButtonColor: '#F76363',
                        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                    }).finally
                }
            }, error => {
                if(error != null){
                    console.log(error)
                }
            }

        );

    }

    estado = 0;
    datosUsuario(){
        if(this.estado == 0){
            document.getElementById('ulPerfil').style.display = 'block';
        this.estado++;
        } else{
            document.getElementById('ulPerfil').style.display = 'none';
            this.estado = 0;
        }
    }

    cerrar(){
        localStorage.clear();
        localStorage.setItem('pagina', '');
        window.location.reload();
    }

    
    datos = JSON.parse(localStorage.getItem('sesion'));
    correoUsu = this.datos.correo;  
    
}