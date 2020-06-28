import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrugDetailsComponent } from './view-drug-details.component';

describe('ViewDrugDetailsComponent', () => {
  let component: ViewDrugDetailsComponent;
  let fixture: ComponentFixture<ViewDrugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrugDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrugDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
