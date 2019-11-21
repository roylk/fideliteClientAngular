import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCommercantComponent } from './creer-commercant.component';

describe('CreerClientsComponent', () => {
  let component: CreerCommercantComponent;
  let fixture: ComponentFixture<CreerCommercantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerCommercantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
