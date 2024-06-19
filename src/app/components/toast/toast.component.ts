import { Component } from '@angular/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  template: `
    <div class="toast flex flex-row items-start">
      @for (toast of toastService.toasts(); track $index) {
        <div
          class="alert alert-info flex max-w-[90vw] flex-col items-start self-center bg-red-400"
          [class]="toast.className"
        >
          <!-- <p
            (click)="toastService.remove(toast.id)"
            class="cursor-pointer self-end"
          >
            Close
          </p> -->
          <span class="whitespace-pre-line text-white">{{
            toast.message
          }}</span>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
