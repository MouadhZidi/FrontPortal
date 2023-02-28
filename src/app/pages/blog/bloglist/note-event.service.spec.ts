import { TestBed } from '@angular/core/testing';

import { NoteEventService } from './note-event.service';

describe('NoteEventService', () => {
  let service: NoteEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
