import { Component } from "@angular/core";
// modelo que se hizo para validar correo y contraseña
import { Usuario } from "../../modelo/usuario";
// importamos el servicio
import { UsuarioService } from '../../service/usuario.service';
// Importar el manejador de rutas
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-ingreso',
    templateUrl: 'ingreso.component.html',
    styleUrls: ['ingreso.component.css']
})


export class ingresoComponent {


    public usuarioIngreso: Usuario;
    public identidad;

    constructor(private usuarioServicio: UsuarioService,
        private _router: Router
    ) {
        this.usuarioIngreso = new Usuario('', '', '', '', '', 'usuario', '');
    }

    ngOnInit(): void {

    }


    ingresoUsuario() {
        this.usuarioServicio.validacion(this.usuarioIngreso).subscribe((response: any) => {
            let validar = response.usuario;
            this.usuarioIngreso = validar;
            if (!this.usuarioIngreso) {
                alert("Datos invalidos");
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
                localStorage.setItem('sesion', JSON.stringify(datosUsuario));
                let dir = JSON.parse(localStorage.getItem('sesion'));
                if (dir.rol == 'usuario') {
                    localStorage.setItem('pagina', 'usuario');
                } else {
                    localStorage.setItem('pagina', 'administrador');
                }
                // Consumir el servidor
                this.identidad = this.usuarioServicio.obtenerNombreUsuario();
                this.usuarioIngreso = new Usuario('', '', '', '', '', 'usuario', '');
                this._router.navigate(['']);
                window.location.reload();
            }
        },
            error => {
                var errorMensaje = <any>error;
                if (errorMensaje != null) {
                    console.log(error);
                    alert('Datos Incorrectos');
                }
            }
        )
    }
}