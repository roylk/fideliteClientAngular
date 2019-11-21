import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerOffreComponent } from './creer-offre.component';

describe('CreerOffreComponent', () => {
  let component: CreerOffreComponent;
  let fixture: ComponentFixture<CreerOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
