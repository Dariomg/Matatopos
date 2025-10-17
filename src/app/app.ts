import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Contador } from './contador/contador';
import { Matatopos } from './matatopos/matatopos';
import { Circulo } from './circulo/circulo';
import { NavBar } from './nav-bar/nav-bar';
import { Carrera } from './carrera/carrera';
import { ListaPersonajes } from './lista-personajes/lista-personajes';
import { FormularioRegistro } from './formulario-registro/formulario-registro';

bootstrapApplication(ListaPersonajes)
  .catch(err => console.error(err));

bootstrapApplication(FormularioRegistro)
  .catch(err => console.error(err));

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Contador, Matatopos, Circulo, NavBar, Carrera, ListaPersonajes, FormularioRegistro],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('Introduccion');
}