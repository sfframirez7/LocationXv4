import { TestBed } from '@angular/core/testing';

import { AlmacenamientoServiceService } from './almacenamiento-service.service';

describe('AlmacenamientoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlmacenamientoServiceService = TestBed.get(AlmacenamientoServiceService);
    expect(service).toBeTruthy();
  });
});
