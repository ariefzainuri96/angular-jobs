import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAction } from './dashboard-action.component';

describe('DashboardActionComponent', () => {
  let component: DashboardAction;
  let fixture: ComponentFixture<DashboardAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAction],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
