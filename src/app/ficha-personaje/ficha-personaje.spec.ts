import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPersonaje } from './ficha-personaje';

describe('FichaPersonaje', () => {
  let component: FichaPersonaje;
  let fixture: ComponentFixture<FichaPersonaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaPersonaje]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaPersonaje);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
