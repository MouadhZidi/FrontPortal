import { TestBed } from '@angular/core/testing';

import { FicheevalcompService } from './ficheevalcomp.service';

describe('FicheevalcompService', () => {
  let service: FicheevalcompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheevalcompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
