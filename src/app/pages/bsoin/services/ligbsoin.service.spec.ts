import { TestBed } from '@angular/core/testing';

import { LigbsoinService } from './ligbsoin.service';

describe('LigbsoinService', () => {
  let service: LigbsoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigbsoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
