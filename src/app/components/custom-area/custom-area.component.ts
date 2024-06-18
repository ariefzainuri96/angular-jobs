import { Component, input, output } from '@angular/core';

@Component({
  selector: 'custom-area',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-start">
      <label class="mt-2 text-sm" [for]="id()">{{ label() }}</label>
      <textarea
        (change)="onInputChange.emit($event)"
        class="input input-bordered mt-2 w-full text-lg"
        [id]="id()"
        [name]="id()"
        [placeholder]="placeholder()"
      ></textarea>
      @if (errorMessage()) {
        <p class="mt-1 text-sm text-red-500">{{ errorMessage() }}</p>
      }
    </div>
  `,
})
export class CustomArea {
  label = input.required<string>();
  id = input<string>();
  placeholder = input<string>();
  errorMessage = input<string>();
  onInputChange = output<Event>();
}
