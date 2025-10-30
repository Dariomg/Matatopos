import { Component, effect } from '@angular/core';
import { HalloweenService } from '../services/halloween';

@Component({
  selector: 'app-circulo',
  standalone: true,
  templateUrl: './circulo.html',
  styleUrl: './circulo.css'
})

export class CirculoComponent {
  modoHalloween = false;

  constructor(private halloweenService: HalloweenService) {
    effect(() => {
      this.modoHalloween = this.halloweenService.modoHalloween();
    });
  }
}
