import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Circulo } from './circulo';

describe('Circulo', () => {
  let component: Circulo;
  let fixture: ComponentFixture<Circulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Circulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Circulo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
