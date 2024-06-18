import { Component, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'custom-select',
  standalone: true,
  imports: [],
  template: `
    <div [class]="merge('flex flex-col items-start', parentClass() ?? '')">
      <label class="text-sm">{{ label() }}</label>
      <select
        class="select select-bordered mt-2 w-full"
        (change)="this.onChange.emit($event)"
      >
        <option disabled selected>{{ placeholder() }}</option>
        @for (item of items(); track $index) {
          <option [value]="item.value">{{ item.content }}</option>
        }
      </select>
      @if (errorMessage()) {
        <p class="mt-1 text-sm text-red-500">{{ errorMessage() }}</p>
      }
    </div>
  `,
})
export class CustomSelect {
  items = input.required<TSelectItem[]>();
  placeholder = input<string>('Select Something');
  label = input.required<string>();
  errorMessage = input<string>();
  onChange = output<Event>();
  parentClass = input<string>();

  merge = (style: string, extendedStyle: string) =>
    twMerge(style, extendedStyle);
}

export type TSelectItem = {
  content: string;
  value: string;
};
