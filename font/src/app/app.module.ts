import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// Importar Módulo Formulario
import { FormsModule } from '@angular/forms';
// Importar el modulo HttpClientModule
import { HttpClientModule } from '@angular/common/http';
// importamos sweetalert para las alertas

// importar servcio usuario
import { UsuarioService } from './service/usuario.service'

import { AppComponent } from './app.component';
import { banerInicioComponent } from './components/banerInicio/banerInicio.component';
import { ingRegistroComponent } from './components/ingRegistro/ingRegistro.component';
import { registroComponent } from './components/registro/registro.component';
import { ingresoComponent } from './components/ingreso/ingreso.component';
import { perfilUsuarioComponent } from './components/perfilUsuario/perfilUsuario.component';
import { datosComponent } from './components/datos/datos.component';
import { añosComponent } from './components/años/años.component';
import { mainUserComponent } from './components/mainUser/mainUser.component';
import { footerComponent } from './components/footer/footer.component';
import { mainSudoComponent } from './components/mainSudo/mainSudo.component';
import { SliderComponent } from './components/slider/slider.component';



@NgModule({
  declarations: [
    AppComponent,
    banerInicioComponent,
    ingRegistroComponent,
    registroComponent,
    ingresoComponent,
    perfilUsuarioComponent,
    datosComponent,
    añosComponent,
    mainUserComponent,
    mainSudoComponent,
    footerComponent,
    SliderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
