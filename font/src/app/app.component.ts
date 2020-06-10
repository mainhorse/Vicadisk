import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
constructor(){}
public pagina;

ngOnInit(): void{
  this.pagina = localStorage.getItem('pagina');
}
  title = 'font';  
}
