import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAirConditionerComponent } from './edit-air-conditioner.component';

describe('EditAirConditionerComponent', () => {
  let component: EditAirConditionerComponent;
  let fixture: ComponentFixture<EditAirConditionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAirConditionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAirConditionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
