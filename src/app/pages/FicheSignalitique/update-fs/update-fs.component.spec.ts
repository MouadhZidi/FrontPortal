import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFSComponent } from './update-fs.component';

describe('UpdateFSComponent', () => {
  let component: UpdateFSComponent;
  let fixture: ComponentFixture<UpdateFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
