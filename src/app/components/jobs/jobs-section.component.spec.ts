import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSection } from './jobs-section.component';

describe('JobsComponent', () => {
  let component: JobsSection;
  let fixture: ComponentFixture<JobsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
