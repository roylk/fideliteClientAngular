import { TestBed } from '@angular/core/testing';

import { FidelisationService } from './fidelisation.service';

describe('FidelisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FidelisationService = TestBed.get(FidelisationService);
    expect(service).toBeTruthy();
  });
});
