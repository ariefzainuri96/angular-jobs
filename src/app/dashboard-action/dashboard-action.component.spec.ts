import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActionComponent } from './dashboard-action.component';

describe('DashboardActionComponent', () => {
  let component: DashboardActionComponent;
  let fixture: ComponentFixture<DashboardActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
