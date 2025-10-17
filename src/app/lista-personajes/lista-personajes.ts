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
    { nombre: 'Godzilla', raza: 'Titanus-Gojira', poder: 5, imagen: '/imagenes-Kaijus/Godzilla.png' },
    { nombre: 'Ghidorah', raza: 'Titanus-Ghidorah', poder: 5, imagen: '/imagenes-Kaijus/Ghidorah.png' },
    { nombre: 'Mothra', raza: 'Titanus-Mosura', poder: 3, imagen: '/imagenes-Kaijus/Mothra.png' },
    { nombre: 'Rodan', raza: 'Titanus-Rodan', poder: 3, imagen: '/imagenes-Kaijus/Rodan.png' },
    { nombre: "Kong", raza: 'Titanus-Kong', poder: 4, imagen: '/imagenes-Kaijus/Kong.png' },
    { nombre: "Mechagodzilla", raza: 'Mecha', poder: 4, imagen: '/imagenes-Kaijus/Mechagodzilla.png' },
    { nombre: 'Shimo', raza: 'Titanus-Shimu', poder: 5, imagen: '/imagenes-Kaijus/Shimo.png' }
  ];
}
