import { Component } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../service/usuario.service';
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
                                document.getElementById('fotUsuario').setAttribute('src', rutaImagen);  
                                                       
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