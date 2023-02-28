import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosocComponent } from './infosoc.component';

describe('InfosocComponent', () => {
  let component: InfosocComponent;
  let fixture: ComponentFixture<InfosocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
