import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-start">
      <label class="mt-2 text-sm" [for]="id()">{{ label() }}</label>
      @if (variant() === 'input') {
        <input
          (change)="onInputChange.emit($event)"
          class="input input-bordered mt-2 w-full text-[16px]"
          [id]="id()"
          [name]="id()"
          [placeholder]="placeholder()"
          [defaultValue]="defaultValue() ?? ''"
        />
      } @else {
        <textarea
          (change)="onInputChange.emit($event)"
          class="input input-bordered mt-2 w-full text-[16px]"
          [id]="id()"
          [name]="id()"
          [placeholder]="placeholder()"
          [defaultValue]="defaultValue() ?? ''"
        ></textarea>
      }
      @if (errorMessage()) {
        <p class="mt-1 text-sm text-red-500">{{ errorMessage() }}</p>
      }
    </div>
  `,
})
export class CustomInput {
  variant = input<'input' | 'area'>('input');
  label = input.required<string>();
  id = input<string>();
  placeholder = input<string>();
  errorMessage = input<string>();
  onInputChange = output<Event>();
  defaultValue = input<string>();
}
