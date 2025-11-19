import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaPersonaje } from '../ficha-personaje/ficha-personaje';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [CommonModule, FichaPersonaje],
  templateUrl: './lista-personajes.html',
  styleUrls: ['./lista-personajes.css']
})
export class ListaPersonajes implements OnInit {

  modoHalloween = false;
  modoNavidad = false;
  titulo = 'Lista de Personajes';

  personajesOriginales = [
    { nombre: 'Godzilla', raza: 'Titanus-Gojira', poder: 5, imagen: '/imagenes-Kaijus/Godzilla.png' },
    { nombre: 'Ghidorah', raza: 'Titanus-Ghidorah', poder: 5, imagen: '/imagenes-Kaijus/Ghidorah.png' },
    { nombre: 'Mothra', raza: 'Titanus-Mosura', poder: 3, imagen: '/imagenes-Kaijus/Mothra.png' },
    { nombre: 'Rodan', raza: 'Titanus-Rodan', poder: 3, imagen: '/imagenes-Kaijus/Rodan.png' },
    { nombre: "Kong", raza: 'Titanus-Kong', poder: 4, imagen: '/imagenes-Kaijus/Kong.png' },
    { nombre: "Mechagodzilla", raza: 'Mecha', poder: 4, imagen: '/imagenes-Kaijus/Mechagodzilla.png' },
    { nombre: 'Shimo', raza: 'Titanus-Shimu', poder: 5, imagen: '/imagenes-Kaijus/Shimo.png' }
  ];

  halloweenPersonajes = [
    { nombre: 'Alien', raza: 'Xenomorpho', poder: 5, imagen: '/imagenes-halloween/Alien.png' },
    { nombre: 'Depredador', raza: 'Yautja', poder: 5, imagen: '/imagenes-halloween/Depredador.png' },
    { nombre: 'Jason Voorhees', raza: 'Humano', poder: 4, imagen: '/imagenes-halloween/Jason.png' },
    { nombre: 'Freddy Krueger', raza: 'Demonio', poder: 4, imagen: '/imagenes-halloween/Freddy.png' }
  ];

  navidadPersonajes = [
    { nombre: 'Santa Claus', raza: 'Humano Mágico', poder: 5, imagen: '/imagenes-navidad/Santa.png' },
    { nombre: 'Reno', raza: 'Criatura Ártica', poder: 3, imagen: '/imagenes-navidad/Reno.png' },
    { nombre: 'Elfo', raza: 'Elfo', poder: 2, imagen: '/imagenes-navidad/Elfo.png' },
    { nombre: 'Muñeco de Nieve', raza: 'Gólem de Hielo', poder: 4, imagen: '/imagenes-navidad/Muñeco.png' }
  ];

  personajes = this.personajesOriginales;

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {}

  ngOnInit(): void {
    this.halloweenService.modoHalloween$.subscribe(v => {
      this.modoHalloween = v;
      this.actualizarContenido();
    });

    this.navidadService.modoNavidad$.subscribe(v => {
      this.modoNavidad = v;
      this.actualizarContenido();
    });
  }

  actualizarContenido() {
    if (this.modoHalloween) {
      this.titulo = "🎃 Lista Terrorífica de Personajes 🎃";
      this.personajes = this.halloweenPersonajes;
    } else if (this.modoNavidad) {
      this.titulo = "🎄 Lista Navideña de Personajes 🎄";
      this.personajes = this.navidadPersonajes;
    } else {
      this.titulo = "Lista de Personajes";
      this.personajes = this.personajesOriginales;
    }
  }
}