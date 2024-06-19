import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSkeletonComponent } from './jobs-skeleton.component';

describe('JobsSkeletonComponent', () => {
  let component: JobsSkeletonComponent;
  let fixture: ComponentFixture<JobsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
