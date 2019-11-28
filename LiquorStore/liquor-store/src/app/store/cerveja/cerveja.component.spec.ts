import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CervejaComponent } from './cerveja.component';

describe('CervejaComponent', () => {
  let component: CervejaComponent;
  let fixture: ComponentFixture<CervejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CervejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CervejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
