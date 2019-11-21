import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueEvaluationComponent } from './politique-evaluation.component';

describe('PolitiqueEvaluationComponent', () => {
  let component: PolitiqueEvaluationComponent;
  let fixture: ComponentFixture<PolitiqueEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitiqueEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitiqueEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
