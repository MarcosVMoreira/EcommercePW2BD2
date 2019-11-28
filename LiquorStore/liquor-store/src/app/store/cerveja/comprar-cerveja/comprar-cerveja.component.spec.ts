import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarCervejaComponent } from './comprar-cerveja.component';

describe('ComprarCervejaComponent', () => {
  let component: ComprarCervejaComponent;
  let fixture: ComponentFixture<ComprarCervejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprarCervejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarCervejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
