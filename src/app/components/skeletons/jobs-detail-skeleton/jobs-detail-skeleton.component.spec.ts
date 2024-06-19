import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsDetailSkeletonComponent } from './jobs-detail-skeleton.component';

describe('JobsDetailSkeletonComponent', () => {
  let component: JobsDetailSkeletonComponent;
  let fixture: ComponentFixture<JobsDetailSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsDetailSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsDetailSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
