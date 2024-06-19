import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { JobsSection } from '../components/jobs/jobs-section.component';

@Component({
  selector: 'jobs',
  standalone: true,
  imports: [JobsSection],
  template: `
    <main #scrollContainer (scroll)="onScroll($event)" class="main bg-blue-50">
      <div class="main-col">
        <jobs-section [isDashboard]="false"></jobs-section>
      </div>
    </main>
  `,
})
export class JobsComponent implements AfterViewInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.scrollToPosition();
  }

  scrollToPosition() {
    const scrollPosition = localStorage.getItem('scroll-/jobs');

    this.scrollContainer.nativeElement.scrollTop = Number(scrollPosition);
  }

  onScroll(e: Event) {
    localStorage.setItem(
      `scroll-/jobs`,
      `${(e.target as HTMLDivElement).scrollTop}`,
    );
  }
}
