import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule
  ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar {
  modoHalloween = false;
  modoNavidad = false;
  isMobile = false;
  sidenavOpened = true;

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.sidenavOpened = !this.isMobile;
  }

  toggleHalloween(estado: boolean) {
    this.modoHalloween = estado;

    if (estado) {
      this.modoNavidad = false;
      this.navidadService.toggleModo(false);
    }

    this.halloweenService.toggleModo(estado);
  }

  toggleNavidad(estado: boolean) {
    this.modoNavidad = estado;

    if (estado) {
      this.modoHalloween = false;
      this.halloweenService.toggleModo(false);
    }

    this.navidadService.toggleModo(estado);
  }

  closeIfMobile(drawer: any) {
    if (this.isMobile) drawer.close();
  }
}