import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
@Component({
    selector: 'app-perfilUsuario',
    templateUrl: 'perfilUsuario.component.html',
    styleUrls: ['perfilUsuario.component.css']

})

export class perfilUsuarioComponent{
    public url: String; 
    constructor(
        private usuarioService : UsuarioService
    ){
        this.url = usuarioService.url;
    }
    logo = 'assets/img/logo_vicadisk.png';
   

    mostrar(){
        document.getElementById('ulPerfil').style.display = 'block';
    }

    ocultar(){
        document.getElementById('ulPerfil').style.display = 'none';
    }

    cerrar(){
        localStorage.clear();
        localStorage.setItem('pagina', '');
        window.location.reload();
    }

    
    datos = JSON.parse(localStorage.getItem('sesion'));
    correo = this.datos.correo;  
    foto = 'assets/img/datPer.png';
      

}