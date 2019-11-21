import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPolitiqueEvaluationComponent } from './creer-politique-evaluation.component';

describe('CreerPolitiqueEvaluationComponent', () => {
  let component: CreerPolitiqueEvaluationComponent;
  let fixture: ComponentFixture<CreerPolitiqueEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerPolitiqueEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerPolitiqueEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
