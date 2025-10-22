import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule
  ],
  templateUrl: './kanban-board.html',
  styleUrls: ['./kanban-board.css']
})
export class KanbanBoard implements OnInit {

  todo: Tarea[] = [];
  doing: Tarea[] = [];
  done: Tarea[] = [];

  nuevaTarea: Tarea = { id: 0, titulo: '', descripcion: '' };
  mostrarDescripcion: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.cargarDesdeLocalStorage();
  }

  agregarTarea() {
    if (this.nuevaTarea.titulo.trim().length === 0) return;

    const tarea: Tarea = {
      id: Date.now(),
      titulo: this.nuevaTarea.titulo,
      descripcion: this.nuevaTarea.descripcion
    };

    this.todo.push(tarea);
    this.nuevaTarea = { id: 0, titulo: '', descripcion: '' };
    this.guardarEnLocalStorage();
  }

  eliminarTarea(lista: Tarea[], tarea: Tarea) {
    const index = lista.indexOf(tarea);
    if (index > -1) {
      lista.splice(index, 1);
      this.guardarEnLocalStorage();
    }
  }

  toggleDescripcion(id: number) {
    this.mostrarDescripcion[id] = !this.mostrarDescripcion[id];
  }

  drop(event: CdkDragDrop<Tarea[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage() {
    localStorage.setItem('kanban', JSON.stringify({
      todo: this.todo,
      doing: this.doing,
      done: this.done
    }));
  }

  cargarDesdeLocalStorage() {
    const datos = localStorage.getItem('kanban');
    if (datos) {
      const { todo, doing, done } = JSON.parse(datos);
      this.todo = todo || [];
      this.doing = doing || [];
      this.done = done || [];
    }
  }
}