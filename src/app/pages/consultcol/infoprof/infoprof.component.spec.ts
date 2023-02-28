import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoprofComponent } from './infoprof.component';

describe('InfoprofComponent', () => {
  let component: InfoprofComponent;
  let fixture: ComponentFixture<InfoprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoprofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
