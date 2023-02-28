import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjagentComponent } from './objagent.component';

describe('ObjagentComponent', () => {
  let component: ObjagentComponent;
  let fixture: ComponentFixture<ObjagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
