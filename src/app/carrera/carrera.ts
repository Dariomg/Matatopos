import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrera.html',
  styleUrls: ['./carrera.css']
})
export class Carrera implements OnInit {
  modoHalloween = false;
  modoNavidad = false;

  posicionesX = [0, 0, 0, 0, 0];
  velocidades = [60, 60, 60, 60, 60];
  aceleraciones = [0, 0, 0, 0, 0];
  direccion = [1, 1, 1, 1, 1];
  pausado = [false, false, false, false, false];

  maxVelocidad = 120; 
  minVelocidad = 40; 

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.halloweenService.modoHalloween$.subscribe(e => this.modoHalloween = e);
    this.navidadService.modoNavidad$.subscribe(e => this.modoNavidad = e);
    this.iniciarCarrera();
    this.activarClicks();
  }

  iniciarCarrera() {
    const chibis = Array.from(
      this.el.nativeElement.querySelectorAll('.chibi, .chibi2, .chibi3, .chibi4, .chibi5')
    ) as HTMLElement[];

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const pista = this.el.nativeElement.querySelector('.pista') as HTMLElement;
      const pistaWidth = pista.offsetWidth - (chibis[0].offsetWidth * 1.2);

      chibis.forEach((chibi, i) => {
        if (this.pausado[i]) return;

        if (Math.random() < 0.01) {
          const cambio = (Math.random() - 0.5) * 10;
          this.aceleraciones[i] += cambio;
        }

        this.velocidades[i] += this.aceleraciones[i] * delta;
        this.velocidades[i] = Math.max(this.minVelocidad, Math.min(this.maxVelocidad, this.velocidades[i]));
        this.posicionesX[i] += this.velocidades[i] * this.direccion[i] * delta;

        if (this.posicionesX[i] >= pistaWidth) {
          this.posicionesX[i] = pistaWidth;
          this.direccion[i] = -1;
        } else if (this.posicionesX[i] <= 0) {
          this.posicionesX[i] = 0;
          this.direccion[i] = 1;
        }

        this.renderer.setStyle(
          chibi,
          'transform',
          `translateX(${this.posicionesX[i]}px) scaleX(${this.direccion[i]})`
        );

        const runSpeed = 1.6 - (this.velocidades[i] / this.maxVelocidad) * 0.8;
        this.renderer.setStyle(chibi, 'animation-duration', `${runSpeed}s, 1s`);
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  activarClicks() {
    const chibis = Array.from(
      document.querySelectorAll('.chibi, .chibi2, .chibi3, .chibi4, .chibi5')
    ) as HTMLElement[];

    chibis.forEach((chibi, index) => {
      chibi.addEventListener('click', () => this.pausarChibi(index));
      chibi.addEventListener('touchstart', () => this.pausarChibi(index));
    });
  }

  pausarChibi(i: number) {
    if (this.pausado[i]) return;

    this.pausado[i] = true;
    const chibi = document.querySelector(`.chibi${i === 0 ? '' : i + 1}`) as HTMLElement;
    chibi?.classList.add('pausado');
    if (chibi) chibi.style.animationPlayState = 'paused';

    setTimeout(() => {
      this.pausado[i] = false;
      if (chibi) {
        chibi.style.animationPlayState = 'running';
        chibi.classList.remove('pausado');
      }
    }, 3000);
  }
}