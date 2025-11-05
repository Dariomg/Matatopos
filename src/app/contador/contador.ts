import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contador.html',
  styleUrls: ['./contador.css']
})
export class Contador {
  contador: number = 0;
  currentLight: 'rojo' | 'verde' | 'amarillo' = 'rojo';
  modoHalloween = false;
  modoNavidad = false;

  private lightsForward: ('rojo' | 'verde' | 'amarillo')[] = ['rojo', 'verde', 'amarillo'];
  private lightsBackward: ('rojo' | 'verde' | 'amarillo')[] = ['rojo', 'amarillo', 'verde'];

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {}

  ngOnInit(): void {
    this.halloweenService.modoHalloween$.subscribe((estado) => (this.modoHalloween = estado));
    this.navidadService.modoNavidad$.subscribe((estado) => (this.modoNavidad = estado));
  }

  aumentar() {
    this.contador++;
    this.changeLight(true);
  }

  disminuir() {
    if (this.contador > 0) {
      this.contador--;
      this.changeLight(false);
    }
  }

  private changeLight(forward: boolean) {
    const sequence = forward ? this.lightsForward : this.lightsBackward;
    const currentIndex = sequence.indexOf(this.currentLight);
    const nextIndex = (currentIndex + 1) % sequence.length;
    this.currentLight = sequence[nextIndex];
  }
}