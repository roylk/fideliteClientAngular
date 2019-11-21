import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTypeOffreComponent } from './creer-type-offre.component';

describe('CreerTypeOffreComponent', () => {
  let component: CreerTypeOffreComponent;
  let fixture: ComponentFixture<CreerTypeOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerTypeOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerTypeOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
