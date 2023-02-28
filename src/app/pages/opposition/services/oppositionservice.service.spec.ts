import { TestBed } from '@angular/core/testing';

import { OppositionserviceService } from './oppositionservice.service';

describe('OppositionserviceService', () => {
  let service: OppositionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OppositionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
