import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularesPage } from './populares.page';

describe('PopularesPage', () => {
  let component: PopularesPage;
  let fixture: ComponentFixture<PopularesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
