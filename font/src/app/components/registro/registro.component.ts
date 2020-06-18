import { Component} from '@angular/core';
import { Usuario } from '../../modelo/usuario'
//importar el servicio usuario
import { UsuarioService } from '../../service/usuario.service';

// importamos el objeto Router
// ActivadeRouter -> Nos indica una ruta activa
// params -> Una ruta con parametros de angular ['perfil', nombre artista]
import { Router, ActivatedRoute, Params } from '@angular/router';

import Swal from 'sweetalert2';

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
                let mensaje = response.message;
                this.usuarioRegistro = usuario;
                if(!this.usuarioRegistro._id){
                    alert(mensaje);
                    this.usuarioRegistro = new Usuario('','','','','','usuario','');
                }else {
                    Swal.fire({
                        title: 'Registro exitoso!',
                        text: `Ya estas registrado! Iniciar sesion con ${this.usuarioRegistro.correo}`,
                        imageUrl: '../../assets/img/flores.jpeg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image', 
                        confirmButtonColor: '#F76363',
                        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                    }).finally
                    this.usuarioRegistro = new Usuario('','','','','','usuario','');
                    this._router.navigate(['/'])
                }
            },
            error =>{
                var errorMensaje = <any>error;
                if(errorMensaje != null){
                    Swal.fire({
                        title: 'Por favor rellene los campos',
                        text: `Rellena los datos guap@`,
                        imageUrl: '../../assets/img/flores.jpeg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image', 
                        confirmButtonColor: '#F76363',
                        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
                    }).finally 
                }
            }
        )

    }
}