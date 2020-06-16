import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CancionService {

url = 'http://localhost:3000/api/';
  constructor(
    private _http : HttpClient
  ) { }

  subirAlbum(nuevoAlbum){
    let params= JSON.stringify(nuevoAlbum);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'}) 
    };
    return this._http.post(
      this.url + 'nuevoAlbum',
      params,
      options
    ).pipe(map(res => res));
  }

  buscarAlbum(busAlbum){
    let params = JSON.stringify(busAlbum);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'buscarAlbum',
      params,
      options
    ).pipe(map(res => res));
  }

  CancionNueva(file: File, id, nombre){
    // instanciamos el objeto FormData que nos permitira enviar la img
    let formData = new FormData();
    formData.append('canciones', file);
    formData.append('titulo', nombre);
    return this._http.put(
      this.url + 'subirCanciones/' + id ,
      formData,
      ).pipe(map(res => res));
    }
  
}
