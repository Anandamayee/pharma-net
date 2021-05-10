import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewDrugHistoryComponent } from './view-drug-history.component';

describe('ViewDrugHistoryComponent', () => {
  let component: ViewDrugHistoryComponent;
  let fixture: ComponentFixture<ViewDrugHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrugHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrugHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
