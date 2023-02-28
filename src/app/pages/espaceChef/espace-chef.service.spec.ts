import { TestBed } from '@angular/core/testing';

import { EspaceChefService } from './espace-chef.service';

describe('EspaceChefService', () => {
  let service: EspaceChefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceChefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
