import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopersComponent } from './infopers.component';

describe('InfopersComponent', () => {
  let component: InfopersComponent;
  let fixture: ComponentFixture<InfopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfopersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
