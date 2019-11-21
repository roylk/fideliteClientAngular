import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarteComponent } from './edit-carte.component';

describe('EditCarteComponent', () => {
  let component: EditCarteComponent;
  let fixture: ComponentFixture<EditCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
