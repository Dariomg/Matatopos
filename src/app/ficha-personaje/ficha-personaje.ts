import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-personaje',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ficha-personaje.html',
  styleUrls: ['./ficha-personaje.css']
})
export class FichaPersonaje {
  @Input() personaje!: { nombre: string; raza: string; poder: number; imagen: string };

  getColorFondo(): string {
    switch (this.personaje.raza) {
      case 'Titanus-Gojira': return '#c7c0f0ff';
      case 'Titanus-Ghidorah': return '#d4c640ff';
      case 'Titanus-Mosura': return '#dd8736ff';
      case 'Titanus-Rodan': return '#e21111ff';
      case 'Titanus-Kong': return '#69490eff';
      case 'Mecha': return '#8a818aff';
      case 'Titanus-Shimu': return '#fff3ffff';
      default: return '#ffffff';
    }
  }

  generarEstrellas(): string[] {
    return Array(this.personaje.poder).fill('⭐');
  }
}
