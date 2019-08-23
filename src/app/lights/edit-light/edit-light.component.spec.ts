import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLightComponent } from './edit-light.component';

describe('EditLightComponent', () => {
  let component: EditLightComponent;
  let fixture: ComponentFixture<EditLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
