import { Component } from '@angular/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  template: `
    <div class="toast">
      @for (toast of toastService.toasts(); track $index) {
        <div
          class="alert alert-info flex flex-col items-start"
          [class]="toast.className"
        >
          <!-- <p
            (click)="toastService.remove(toast.id)"
            class="cursor-pointer self-end"
          >
            Close
          </p> -->
          <span class="text-white">{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
