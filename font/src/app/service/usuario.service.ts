import { Injectable } from '@angular/core';
// Importar El mòdulo HttpClient y Httpheader
import { HttpClient, HttpHeaders } from '@angular/common/http';
// importar el map 
import { map } from 'rxjs/operators'
//importar nuestro observable
import { Observable } from 'rxjs';



@Injectable()
export class UsuarioService {
  // declarar la variable identidad
  public identidad;
  // declarar la varciable url de la api
  url = 'http://localhost:3000/api/';

  constructor(
    private _http : HttpClient
  ) { }
  //----------------------------------------- 
  // Declarar el mètodo del servicio registro
  registro(usuarioNuevo){
    console.log(usuarioNuevo);
    console.log(usuarioNuevo)
    let params = JSON.stringify(usuarioNuevo);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'registro',
      params,
      options
    ).pipe(map(res => res));
  }
  //------------------------------------------

  validacion(validacionUsuario){
    let params = JSON.stringify(validacionUsuario);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'login',
      params,
      options
    ).pipe(map(res => res));
  }

  //-------------------------------------------
  // declarar el metodo del servicio obtenerNombreUsuario

  obtenerNombreUsuario(){
    /* En una variable llamada identidad recojeremos los datos de nuestro usuario una vez que haya 
    iniciado sesion. Estos datos estaran en la local storage*/
    let usarioAutorizado = JSON.parse(localStorage.getItem('sesion'));
    if(usarioAutorizado != 'undefined'){
      this.identidad = usarioAutorizado;
    } else {
      this.identidad = null;
    }
    return this.identidad;
  }

  // Declarar el método del servicio editarUsuario
  editarUsuario(id, usuarioActualizado){
    let params = JSON.stringify(usuarioActualizado);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.put(
      this.url + 'actualizar/' + id,
      params,
      options
    ).pipe(map(res => res));
  }

  //Declarar el método del servicio cargarImagen
  cargarImagenUsuario(file: File, id){
    // instanciamos el objeto FormData que nos permitira enviar la img
    let formData = new FormData();
    formData.append('imagen', file);
    return this._http.put(
      this.url + 'subirImagen/' + id,
      formData
    ).pipe(map(res => res));
  }
}
