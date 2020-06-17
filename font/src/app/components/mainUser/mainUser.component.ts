import { Component } from '@angular/core';
import { CancionService } from '../../service/cancion.service';

@Component({
    selector: 'app-mainUser',
    templateUrl: 'mainUser.component.html',
    styleUrls: ['mainUser.component.css']
})

export class mainUserComponent{

    htmlPrueba: String = "<audio controls class='audio' src = '{{ this.url + 'ObtenerCancion/' + d7pq4a2B5hMqSXV-xGQBNTFx.mp3}}'></audio>";
    caratula = 'assets/img/acetato.png';
    logo_busqueda = 'assets/img/walkman.png';
    cassete = 'assets/img/casete.png';
    imagen1 = ['assets/img/Roll.jpg'];
  
    public url: String;   
   
    canciones = JSON.parse(localStorage.getItem('album')); 
    reproducir = JSON.parse(localStorage.getItem('listasReproduccion'));
    

    constructor(
        private cancionService : CancionService
        
    ){
        this.url = cancionService.url
    }

    mostrarCanciones(canciones){
        
        var lista = canciones.canciones;
        var lon = lista.length;
        var con = 0;
        var arreglo = [];
        while(con < lon){
        var pista = lista[con];
        var cancion = {cancion : pista};  
        arreglo.push(cancion);
        console.log(cancion);         
        con++;
        }
        localStorage.setItem('listasReproduccion', JSON.stringify(arreglo));
        window.location.reload();             
    }
    

}