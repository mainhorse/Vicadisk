import { Component} from '@angular/core';
import { Usuario } from '../../modelo/usuario'
//importar el servicio usuario
import { UsuarioService } from '../../service/usuario.service';

// importamos el objeto Router
// ActivadeRouter -> Nos indica una ruta activa
// params -> Una ruta con parametros de angular ['perfil', nombre artista]
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
    selector : 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})

export class registroComponent{

    // Declaracion variable usuarioRegistro
    
    public usuarioRegistro : Usuario;

    constructor(private usuarioServicio : UsuarioService,
        private _router : Router
        ){
        this.usuarioRegistro = new Usuario('','','','','','usuario','');
    }

    ngOnInit(): void{

    }

    // metodo registrarUsuario()
    registrarUsuario(){
        this.usuarioServicio.registro(this.usuarioRegistro).subscribe(
            (response : any)=>{
                let usuario = response.usuario;
                this.usuarioRegistro = usuario;

                if(!this.usuarioRegistro._id){
                    alert('Error al registrarse')
                }else {
                    alert(`Registro exitoso! Iniciar sesion con ${this.usuarioRegistro.correo}`);
                    this.usuarioRegistro = new Usuario('','','','','','usuario','');
                    this._router.navigate(['/'])
                }
            },
            error =>{
                var errorMensaje = <any>error;
                if(errorMensaje != null){
                    console.log(error);
                }
            }
        )

    }
}