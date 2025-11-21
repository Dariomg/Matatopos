import { Routes } from '@angular/router';
import { Contador } from './contador/contador';
import { Matatopos } from './matatopos/matatopos';
import { Carrera } from './carrera/carrera';
import { CirculoComponent } from './circulo/circulo';
import { ListaPersonajes } from './lista-personajes/lista-personajes';
import { FormularioRegistro } from './formulario-registro/formulario-registro';
import { KanbanBoard } from './kanban-board/kanban-board';
import { Clicker } from './clicker/clicker';

export const routes: Routes = [
    { path: 'contador', component: Contador},
    { path: 'lista-personajes', component: ListaPersonajes},
    { path: 'matatopos', component: Matatopos},
    { path: 'circulo', component: CirculoComponent},
    { path: 'carrera', component: Carrera}, 
    { path: 'formulario-registro', component: FormularioRegistro},
    { path: 'kanban-board', component: KanbanBoard},
    { path: 'clicker', component: Clicker} 
];