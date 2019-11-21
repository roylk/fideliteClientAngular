import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerRegionComponent } from './creer-region.component';

describe('CreerRegionComponent', () => {
  let component: CreerRegionComponent;
  let fixture: ComponentFixture<CreerRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
