import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerTypeOffreComponent } from './editer-type-offre.component';

describe('EditerTypeOffreComponent', () => {
  let component: EditerTypeOffreComponent;
  let fixture: ComponentFixture<EditerTypeOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerTypeOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerTypeOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
