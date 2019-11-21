import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCategoriesComponent } from './creer-categories.component';

describe('CreerCategoriesComponent', () => {
  let component: CreerCategoriesComponent;
  let fixture: ComponentFixture<CreerCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
