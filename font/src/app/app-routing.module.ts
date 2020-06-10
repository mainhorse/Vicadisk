import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { registroComponent } from './components/registro/registro.component';
import { ingresoComponent } from './components/ingreso/ingreso.component';
import { perfilUsuarioComponent } from  './components/perfilUsuario/perfilUsuario.component';
import { datosComponent } from './components/datos/datos.component';


const routes : Routes = [
    //{path:'', component : },
    {path :'registro' , component : registroComponent},
    {path: 'ingreso', component: ingresoComponent},
    {path: 'perfil', component: perfilUsuarioComponent},
    {path: 'datos', component: datosComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class  AppRoutingModule{

}
