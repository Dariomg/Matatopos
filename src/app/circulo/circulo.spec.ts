import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculoComponent } from './circulo';

describe('CirculoComponent', () => {
  let component: CirculoComponent;
  let fixture: ComponentFixture<CirculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
