import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-matatopos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matatopos.html',
  styleUrls: ['./matatopos.css']
})
export class Matatopos implements OnInit {
  gridSize = 9;
  activeIndex: number = -1;
  score: number = 0;

  modoHalloween = false;
  modoNavidad = false;

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {}

  ngOnInit(): void {
    this.spawnTopo();

    this.halloweenService.modoHalloween$.subscribe((estado: boolean) => {
      this.modoHalloween = estado;
    });

    this.navidadService.modoNavidad$.subscribe((estado: boolean) => {
      this.modoNavidad = estado;
    });
  }

  spawnTopo(): void {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * this.gridSize);
    } while (newIndex === this.activeIndex);
    this.activeIndex = newIndex;
  }

  hitTopo(index: number): void {
    if (index === this.activeIndex) {
      this.score++;
      this.spawnTopo();
    } else {
      this.score = 0;
      this.activeIndex = -1;
      this.spawnTopo();
    }
  }

  get topoImage(): string {
    if (this.modoHalloween) return '/calabaza.png';
    if (this.modoNavidad) return '/muñeco.png';
    return '/topo.png';
  }

  get modoClase(): string {
    if (this.modoHalloween) return 'halloween';
    if (this.modoNavidad) return 'navidad';
    return '';
  }
}