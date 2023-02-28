import { TestBed } from '@angular/core/testing';

import { ObjempService } from './objemp.service';

describe('ObjempService', () => {
  let service: ObjempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
