import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPalierComponent } from './creer-palier.component';

describe('CreerPalierComponent', () => {
  let component: CreerPalierComponent;
  let fixture: ComponentFixture<CreerPalierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerPalierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerPalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
