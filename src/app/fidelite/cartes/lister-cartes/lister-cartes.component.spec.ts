import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerCartesComponent } from './lister-cartes.component';

describe('ListerCartesComponent', () => {
  let component: ListerCartesComponent;
  let fixture: ComponentFixture<ListerCartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerCartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
