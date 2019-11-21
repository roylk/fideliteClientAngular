import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerConversionComponent } from './editer-conversion.component';

describe('EditerConversionComponent', () => {
  let component: EditerConversionComponent;
  let fixture: ComponentFixture<EditerConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
