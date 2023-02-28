import { TestBed } from '@angular/core/testing';

import { ValeurficheevalService } from './valeurficheeval.service';

describe('ValeurficheevalService', () => {
  let service: ValeurficheevalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValeurficheevalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
