import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerRegionComponent } from './editer-region.component';

describe('EditerRegionComponent', () => {
  let component: EditerRegionComponent;
  let fixture: ComponentFixture<EditerRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
