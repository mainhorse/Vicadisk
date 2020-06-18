import{ Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../service/usuario.service';


import Swal from 'sweetalert2';

@Component({
    selector: 'app-datos',
    templateUrl: 'datos.component.html',
    styleUrls: ['datos.component.css']
})



export class datosComponent implements OnInit{
    //Declaramos la variable usuarioActualizar
    public usuarioActualizar : Usuario;
    // Declarar la variable archivoSubir de tipo File
    public archivoSubir : File;
    // Declarar la variable identidad;
    public identidad;
    // Declaramos la variable url
    public url: String; 

    constructor(
        private usuarioService : UsuarioService
    ){
        this.url = usuarioService.url;
    }
        ngOnInit(): void{
            this.usuarioActualizar = JSON.parse(localStorage.getItem('sesion'));
            this.identidad = this.usuarioService.obtenerNombreUsuario();
        }
        //metodo subirArchivo
        subirArchivo(fileInput : any){
            this.archivoSubir = <File>fileInput.target.files[0];
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
                                title: 'Has actualizado tus datos',
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
                                title: 'Has actualizado tus datos',
                                text: `Disfruta tu nueva identidad`,
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
                                    
                                    //document.getElementById('mostrarImagen').setAttribute('src',rutaImagen);
                                    document.getElementById('imgUsuario').setAttribute('src', rutaImagen);
                                    
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
}