import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Componentes standalone (todos tienen standalone: true)
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Card } from './components/card/card';
import { Loading } from './components/loading/loading';
import { Alert } from './components/alert/alert';
import { Home } from './pages/home/home';
import { Busqueda } from './pages/busqueda/busqueda';

@NgModule({
  declarations: [
    App  // Solo App va aquí (NO es standalone)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // Todos los standalone components van AQUÍ
    Header,
    Footer,
    Card,
    Loading,
    Alert,
    Home,
    Busqueda
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }