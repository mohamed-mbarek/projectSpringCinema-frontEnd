import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CinemaComponent } from './composant/cinema/cinema.component';
import { VilleComponent } from './composant/ville/ville.component';
import { LoginComponent } from './composant/login/login.component';
import { NavbarComponent } from './composant/navbar/navbar.component';
import { ForbidenComponent } from './composant/forbiden/forbiden.component';

@NgModule({
  declarations: [
    AppComponent,
    VilleComponent,
    CinemaComponent,
    LoginComponent,
    NavbarComponent,
    ForbidenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,CinemaComponent,VilleComponent,LoginComponent]
})
export class AppModule { }
