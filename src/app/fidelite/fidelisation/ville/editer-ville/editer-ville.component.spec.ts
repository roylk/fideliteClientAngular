import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerVilleComponent } from './editer-ville.component';

describe('EditerVilleComponent', () => {
  let component: EditerVilleComponent;
  let fixture: ComponentFixture<EditerVilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerVilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
