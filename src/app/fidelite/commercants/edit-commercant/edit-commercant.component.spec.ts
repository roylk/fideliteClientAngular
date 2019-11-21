import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommercantComponent } from './edit-commercant.component';

describe('EditCommercantComponent', () => {
  let component: EditCommercantComponent;
  let fixture: ComponentFixture<EditCommercantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommercantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
