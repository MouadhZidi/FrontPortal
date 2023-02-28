import { TestBed } from '@angular/core/testing';

import { RenseignementpersService } from './renseignementpers.service';

describe('RenseignementpersService', () => {
  let service: RenseignementpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenseignementpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
