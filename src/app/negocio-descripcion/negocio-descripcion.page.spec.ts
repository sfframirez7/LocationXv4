import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioDescripcionPage } from './negocio-descripcion.page';

describe('NegocioDescripcionPage', () => {
  let component: NegocioDescripcionPage;
  let fixture: ComponentFixture<NegocioDescripcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegocioDescripcionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocioDescripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
