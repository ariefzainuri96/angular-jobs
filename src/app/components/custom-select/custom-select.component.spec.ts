import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelect } from './custom-select.component';

describe('CustomSelectComponent', () => {
  let component: CustomSelect;
  let fixture: ComponentFixture<CustomSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
