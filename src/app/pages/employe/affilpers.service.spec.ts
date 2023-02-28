import { TestBed } from '@angular/core/testing';

import { AffilpersService } from './affilpers.service';

describe('AffilpersService', () => {
  let service: AffilpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffilpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
