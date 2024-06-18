import { Component, SimpleChanges, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getRandomInt } from '../../utils/utils';
import {
  CustomSelect,
  TSelectItem,
} from '../components/custom-select/custom-select.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterLink, CustomSelect],
  template: `
    <div class="flex flex-col items-start overflow-y-auto p-4 pt-2">
      <p class="text-2xl font-semibold text-slate-500">This is home</p>
      <input
        class="mt-2 rounded-md bg-slate-50 p-2"
        placeholder="Type something"
        [disabled]="disableForm"
      />
      <p>Input is {{ disableForm ? 'disabled' : 'enabled' }}</p>
      <button
        class="mt-2 rounded-md bg-red-100 p-2 hover:bg-red-200"
        (click)="disableForm = !disableForm"
      >
        Toggle Form
      </button>
      <div class="mt-2">
        <input
          (change)="showList.set(!showList())"
          onclick=""
          id="checkbox"
          type="checkbox"
          [checked]="showList()"
        />
        <label class="ml-2" for="checkbox">Show List</label>
      </div>
      @if (showList()) {
        <div class="flex flex-col items-start">
          @for (item of items; track item.title; let i = $index) {
            <p
              class="mt-1 text-lg font-semibold text-slate-600 hover:bg-slate-300"
            >
              {{ i + 1 }}. {{ item.title }}
            </p>
          }
        </div>
      }
      <p>Random number is {{ randomInt }}</p>
      <custom-select
        (onChange)="onSelectChange($event)"
        [items]="selectItems"
        class="mt-4"
        label="Test label"
        id="test-label"
      ></custom-select>
      <p class="mt-2">Selected value is {{ valueSelected ?? '-' }}</p>
      <a
        class="btn btn-primary mt-2"
        routerLink="/fetch"
        routerLinkActive="active"
        >Test Fetch</a
      >
      <div class="mt-4 size-96 bg-red-200"></div>
      <div class="mt-4 size-96 bg-red-200"></div>
      <p>Testing</p>
    </div>
  `,
})
export class HomeComponent {
  showList = signal<boolean>(false);
  items: TItem[] = [
    { title: 'Home', description: 'This is home' },
    { title: 'Jobs', description: 'This is jobs' },
    { title: 'Add Jobs', description: 'This is add jobs' },
  ];
  disableForm = true;
  randomInt = getRandomInt(1, 100);
  selectItems: TSelectItem[] = [
    { content: 'Home', value: 'home' },
    { content: 'Jobs', value: 'jobs' },
    { content: 'Add Jobs', value: 'add-jobs' },
  ];
  valueSelected: string | undefined;

  onSelectChange(event: Event) {
    this.valueSelected = (event.target as HTMLSelectElement).value;
  }

  constructor() {
    effect(() => {
      console.log(`The current showList is: ${this.showList}`);
    });
  }
}

type TItem = {
  title: string;
  description: string;
};
