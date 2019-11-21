import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPolitiqueEvaluationComponent } from './editer-politique-evaluation.component';

describe('EditerPolitiqueEvaluationComponent', () => {
  let component: EditerPolitiqueEvaluationComponent;
  let fixture: ComponentFixture<EditerPolitiqueEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerPolitiqueEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPolitiqueEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
