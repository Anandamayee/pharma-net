import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailDrugComponent } from './retail-drug.component';

describe('RetailDrugComponent', () => {
  let component: RetailDrugComponent;
  let fixture: ComponentFixture<RetailDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
