import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerConversionComponent } from './creer-conversion.component';

describe('CreerConversionComponent', () => {
  let component: CreerConversionComponent;
  let fixture: ComponentFixture<CreerConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
