import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerVilleComponent } from './creer-ville.component';

describe('CreerVilleComponent', () => {
  let component: CreerVilleComponent;
  let fixture: ComponentFixture<CreerVilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerVilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
