import { Component, input, output } from '@angular/core';

@Component({
  selector: 'custom-select',
  standalone: true,
  imports: [],
  template: `
    <select
      class="select select-bordered w-full max-w-xs"
      (change)="this.onChange.emit($event)"
    >
      <option disabled selected>{{ placeholder() }}</option>
      @for (item of items(); track $index) {
        <option [value]="item.value">{{ item.content }}</option>
      }
    </select>
  `,
})
export class CustomSelect {
  items = input.required<TSelectItem[]>();
  placeholder = input<string>('Select Something');
  onChange = output<Event>();
}

export type TSelectItem = {
  content: string;
  value: string;
};
