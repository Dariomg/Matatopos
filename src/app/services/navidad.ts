import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavidadService {
  private modoNavidadActivo = new BehaviorSubject<boolean>(false);
  modoNavidad$ = this.modoNavidadActivo.asObservable();

  toggleModo(estado: boolean) {
    this.modoNavidadActivo.next(estado);
  }

  getModoActual(): boolean {
    return this.modoNavidadActivo.value;
  }
}
