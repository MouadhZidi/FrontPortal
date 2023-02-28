import { TestBed } from '@angular/core/testing';

import { NivpersService } from './nivpers.service';

describe('NivpersService', () => {
  let service: NivpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
