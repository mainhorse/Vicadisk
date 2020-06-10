import{ Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../service/usuario.service';

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
                        alert('Tus datos han sido actualizados correctamente');
                        localStorage.setItem('sesion', JSON.stringify(this.usuarioActualizar));
                        // validacion y consumo del servicio de la carga de imagen
                        if(!this.archivoSubir){
                            alert('No hay ninguna imagen');
                        } else {
                            alert(`Tu imagen es ${this.archivoSubir.name}`);
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
                        alert('No fue posible actualizar tus datos');
                    }
                }, error => {
                    if(error != null){
                        console.log(error)
                    }
                }

            );

        }
}