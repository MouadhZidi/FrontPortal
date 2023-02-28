import { TestBed } from '@angular/core/testing';

import { CompreelService } from './compreel.service';

describe('CompreelService', () => {
  let service: CompreelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompreelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
