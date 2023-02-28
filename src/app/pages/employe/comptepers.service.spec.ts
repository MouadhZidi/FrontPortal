import { TestBed } from '@angular/core/testing';

import { ComptepersService } from './comptepers.service';

describe('ComptepersService', () => {
  let service: ComptepersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComptepersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
