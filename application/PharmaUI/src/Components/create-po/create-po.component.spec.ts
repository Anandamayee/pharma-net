import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreatePoComponent } from './create-po.component';

describe('CreatePoComponent', () => {
  let component: CreatePoComponent;
  let fixture: ComponentFixture<CreatePoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
