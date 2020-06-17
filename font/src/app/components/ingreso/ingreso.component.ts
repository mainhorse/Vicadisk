import { Component } from "@angular/core";
// modelo que se hizo para validar correo y contraseña
import { Usuario } from "../../modelo/usuario";
// importamos el servicio
import { Cancion } from "../../modelo/Cancion";
import { UsuarioService } from '../../service/usuario.service';
// Importar el manejador de rutas
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
    selector: 'app-ingreso',
    templateUrl :'ingreso.component.html',
    styleUrls: ['ingreso.component.css']
})


export class ingresoComponent{
    

    public usuarioIngreso : Usuario;
    public identidad;
    public cancion : Cancion;

    constructor(private usuarioServicio : UsuarioService,
        private _router : Router
        ){
      this.usuarioIngreso = new Usuario('','','','','','usuario',''); 
      this.cancion = new Cancion('','','','',[],[]);
    }

    ngOnInit(): void{

    }


    ingresoUsuario(){
        this.usuarioServicio.validacion(this.usuarioIngreso).subscribe((response : any)=>{
            let validar = response.usuario;
            this.usuarioIngreso = validar;
            if(!this.usuarioIngreso){
                alert("Datos invalidos"); 
                this.usuarioIngreso = new Usuario('','','','','','usuario','');  
            } else{
                                
                    let datosUsuario = new Usuario(
                        this.usuarioIngreso._id,
                        this.usuarioIngreso.nombre,
                        this.usuarioIngreso.apellido,
                        this.usuarioIngreso.correo,
                        this.usuarioIngreso.contrasena,
                        this.usuarioIngreso.rol,
                        this.usuarioIngreso.imagen
                    );
                        // creamos el objeto localStorage  
                        localStorage.setItem('sesion',JSON.stringify(datosUsuario));
                        let dir = JSON.parse(localStorage.getItem('sesion'));

                        if(dir.rol == "administrador"){
                            localStorage.setItem('pagina','administrador'); 
                            localStorage.setItem('album', JSON.stringify(this.cancion)); 
                        } else {
                            localStorage.setItem('pagina','usuario'); 
                            localStorage.setItem('album', JSON.stringify(this.cancion));
                        }                                               
                        // Consumir el servidor
                        this.identidad = this.usuarioServicio.obtenerNombreUsuario();
                        this.usuarioIngreso = new Usuario('','','','','','usuario','');
                                            
                        window.location.reload();    
            }
        },
        error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
                alert('Datos Incorrectos');
            }
        }
        )
    }
}