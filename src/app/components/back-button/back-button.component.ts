import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixArrowLeft } from '@ng-icons/radix-icons';

@Component({
  selector: 'back-button',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ radixArrowLeft })],
  template: `
    <div class="block sm:hidden">
      <div
        (click)="goBack()"
        class="flex size-8 items-center justify-center rounded-full bg-white"
      >
        <ng-icon
          name="radixArrowLeft"
          size="20"
          class="text-gray-500"
        ></ng-icon>
      </div>
    </div>
  `,
})
export class BackButton {
  constructor(private location: Location) {}

  goBack = () => this.location.back();
}
