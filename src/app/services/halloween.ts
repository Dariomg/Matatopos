import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HalloweenService {
  private modoHalloweenActivo = new BehaviorSubject<boolean>(false);
  modoHalloween$ = this.modoHalloweenActivo.asObservable();

  toggleModo(estado: boolean) {
    this.modoHalloweenActivo.next(estado);
  }

  getModoActual(): boolean {
    return this.modoHalloweenActivo.value;
  }
}