import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsantiesmeByLibComponent } from './absantiesme-by-lib.component';

describe('AbsantiesmeByLibComponent', () => {
  let component: AbsantiesmeByLibComponent;
  let fixture: ComponentFixture<AbsantiesmeByLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsantiesmeByLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsantiesmeByLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
