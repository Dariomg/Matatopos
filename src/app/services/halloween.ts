import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HalloweenService {
  modoHalloween = signal(false);

  toggleModo(estado: boolean) {
    this.modoHalloween.set(estado);
  }
}