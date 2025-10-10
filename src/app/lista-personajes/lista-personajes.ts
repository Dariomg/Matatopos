import { Component } from '@angular/core';
import { FichaPersonaje } from '../ficha-personaje/ficha-personaje';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [FichaPersonaje],
  templateUrl: './lista-personajes.html',
  styleUrls: ['./lista-personajes.css']
})
export class ListaPersonajes {
  personajes = [
    { nombre: 'Godzilla', raza: 'Titanus-Gojira', poder: 5, imagen: '/Godzilla.png' },
    { nombre: 'Ghidorah', raza: 'Titanus-Ghidorah', poder: 5, imagen: '/Ghidorah.png' },
    { nombre: 'Mothra', raza: 'Titanus-Mosura', poder: 3, imagen: '/Mothra.png' },
    { nombre: 'Rodan', raza: 'Titanus-Rodan', poder: 3, imagen: '/Rodan.png' },
    { nombre: "Kong", raza: 'Titanus-Kong', poder: 4, imagen: '/Kong.png' },
    { nombre: "Mechagodzilla", raza: 'Mecha', poder: 4, imagen: '/Mechagodzilla.png' },
    { nombre: 'Shimo', raza: 'Titanus-Shimu', poder: 5, imagen: '/Shimo.png' }
  ];
}
