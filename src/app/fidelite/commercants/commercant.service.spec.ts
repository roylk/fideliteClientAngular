import { TestBed } from '@angular/core/testing';

import { CommercantsService } from './commercant.service';

describe('CommercantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommercantsService = TestBed.get(CommercantsService);
    expect(service).toBeTruthy();
  });
});
