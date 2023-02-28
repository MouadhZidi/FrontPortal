import { TestBed } from '@angular/core/testing';

import { EspaceRhService } from './espace-rh.service';

describe('EspaceRhService', () => {
  let service: EspaceRhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceRhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
