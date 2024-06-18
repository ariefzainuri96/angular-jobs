import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-start">
      <label class="mt-2 text-sm" [for]="id()">{{ label() }}</label>
      <input
        (change)="onInputChange.emit($event)"
        class="input input-bordered mt-2 w-full text-lg"
        [id]="id()"
        [name]="id()"
        [placeholder]="placeholder()"
      />
      @if (errorMessage()) {
        <p class="mt-1 text-sm text-red-500">{{ errorMessage() }}</p>
      }
    </div>
  `,
})
export class CustomInput {
  label = input.required<string>();
  id = input<string>();
  placeholder = input<string>();
  errorMessage = input<string>();
  onInputChange = output<Event>();
}
