import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contador } from './contador/contador';
import { Matatopos } from './matatopos/matatopos';
import { CirculoComponent } from './circulo/circulo';
import { NavBar } from './nav-bar/nav-bar';
import { Carrera } from './carrera/carrera';
import { ListaPersonajes } from './lista-personajes/lista-personajes';
import { FormularioRegistro } from './formulario-registro/formulario-registro';
import { KanbanBoard } from './kanban-board/kanban-board';
import { Clicker } from './clicker/clicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Contador,
    Matatopos,
    CirculoComponent,
    NavBar,
    Carrera,
    ListaPersonajes,
    FormularioRegistro,
    KanbanBoard,
    Clicker
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('Introduccion');
}