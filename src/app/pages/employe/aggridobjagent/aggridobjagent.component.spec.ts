import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridobjagentComponent } from './aggridobjagent.component';

describe('AggridobjagentComponent', () => {
  let component: AggridobjagentComponent;
  let fixture: ComponentFixture<AggridobjagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridobjagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridobjagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
