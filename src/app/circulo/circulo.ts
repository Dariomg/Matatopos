import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-circulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circulo.html',
  styleUrls: ['./circulo.css']
})
export class CirculoComponent implements OnInit {
  modoHalloween = false;
  modoNavidad = false;
  titulo = 'Círculo';

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {}

  ngOnInit(): void {
    this.halloweenService.modoHalloween$.subscribe((v) => {
      this.modoHalloween = v;
      this.actualizarTitulo();
    });

    this.navidadService.modoNavidad$.subscribe((v) => {
      this.modoNavidad = v;
      this.actualizarTitulo();
    });

    this.actualizarTitulo();
  }

  actualizarTitulo(): void {
    if (this.modoHalloween) {
      this.titulo = '🎃 Círculo Terrorífico 🎃';
    } else if (this.modoNavidad) {
      this.titulo = '🎄 Círculo Navideño 🎄';
    } else {
      this.titulo = 'Círculo';
    }
  }
}