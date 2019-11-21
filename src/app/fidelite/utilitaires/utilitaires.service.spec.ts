import { TestBed } from '@angular/core/testing';

import { UtilitairesService } from './utilitaires.service';

describe('UtilitairesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilitairesService = TestBed.get(UtilitairesService);
    expect(service).toBeTruthy();
  });
});
