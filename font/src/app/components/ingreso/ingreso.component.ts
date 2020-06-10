import { Component } from "@angular/core";
// modelo que se hizo para validar correo y contraseña
import { Usuario } from "../../modelo/usuario";
// importamos el servicio
import { UsuarioService } from '../../service/usuario.service';
// Importar el manejador de rutas
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-ingreso',
    templateUrl :'ingreso.component.html',
    styleUrls: ['ingreso.component.css']
})


export class ingresoComponent{
    

    public usuarioIngreso : Usuario;
    public identidad;

    constructor(private usuarioServicio : UsuarioService,
        private _router : Router
        ){
      this.usuarioIngreso = new Usuario('','','','','','usuario',''); 
    }

    ngOnInit(): void{

    }


    ingresoUsuario(){
        this.usuarioServicio.validacion(this.usuarioIngreso).subscribe((response : any)=>{
            let validar = response.usuario;
            this.usuarioIngreso = validar;
            if(!this.usuarioIngreso.correo){
                alert("Datos invalidos");   
            } else{
                if(!this.usuarioIngreso.contrasena){
                    alert("Datos Invalidos");
                } else {                
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
                        localStorage.setItem('pagina','usuario');
                        // Consumir el servidor
                        this.identidad = this.usuarioServicio.obtenerNombreUsuario();
                        this.usuarioIngreso = new Usuario('','','','','','usuario','');
                        //localStorage.setItem('pagina','usuario');
                        localStorage.setItem('pagina','usuario');
                        this._router.navigate(['/'])
                }
            }
        },
        error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
                console.log(error);
                alert('Datos Incorrectos');
            }
        }
        )
    }
}