import { Component, signal } from '@angular/core';
import {
  CustomSelect,
  TSelectItem,
} from '../custom-select/custom-select.component';
import { CustomInput } from '../custom-input/custom-input.component';
import { JobItem } from '../../../data/model/job-item';
import { CustomArea } from '../custom-area/custom-area.component';

@Component({
  selector: 'app-jobs-form',
  standalone: true,
  imports: [CustomSelect, CustomInput, CustomArea],
  template: `
    <form>
      <custom-select
        [items]="jobType"
        (onChange)="onSelectChange($event, 'type')"
        label="Job Type"
      ></custom-select>
      <custom-input
        id="title"
        label="Job Title"
        placeholder="eg. Angular Developer"
        (onInputChange)="handleChange($event)"
      ></custom-input>
      <custom-area
        id="description"
        label="Description"
        placeholder="Add a description of your job"
        (onInputChange)="handleChange($event)"
      ></custom-area>
      <custom-select
        parentClass="mt-2"
        [items]="jobSalary"
        (onChange)="onSelectChange($event, 'salary')"
        label="Salary"
      ></custom-select>
      <custom-input
        id="location"
        label="Location"
        placeholder="Add a location of your job"
        (onInputChange)="handleChange($event)"
      ></custom-input>
      <p class="mt-4 text-lg font-semibold">Company Info</p>
      <custom-input
        id="name"
        label="Company Name"
        placeholder="Add a company name of your job"
        (onInputChange)="handleCompanyChange($event)"
      ></custom-input>
      <custom-input
        id="description"
        label="Company Description"
        placeholder="Add a company description of your job"
        (onInputChange)="handleCompanyChange($event)"
      ></custom-input>
      <custom-input
        id="contactEmail"
        label="Company Email"
        placeholder="Add a company email of your job"
        (onInputChange)="handleCompanyChange($event)"
      ></custom-input>
      <custom-input
        id="contactPhone"
        label="Company Phone"
        placeholder="Add a company phone of your job"
        (onInputChange)="handleCompanyChange($event)"
      ></custom-input>
      <button
        (click)="handleCreate($event)"
        class="btn btn-primary mt-4 w-full text-lg text-white"
        type="submit"
      >
        Create
      </button>
    </form>
  `,
})
export class JobsFormComponent {
  job = signal<JobItem | null>(null);

  jobType: TSelectItem[] = [
    { content: 'Full-time', value: 'Full-time' },
    { content: 'Part-time', value: 'Part-time' },
    { content: 'Contract', value: 'Contract' },
  ];

  jobSalary: TSelectItem[] = [
    { content: '$100k', value: '100000' },
    { content: '$200k', value: '200000' },
    { content: '$300k', value: '300000' },
    { content: '$400k', value: '400000' },
    { content: '$500k', value: '500000' },
  ];

  onSelectChange(event: Event, name: 'type' | 'salary') {
    this.job.update((job) => ({
      ...job,
      [name]: (event.target as HTMLSelectElement).value,
    }));
  }

  handleChange(event: Event) {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;

    this.job.update((job) => ({
      ...job,
      [name]: value,
    }));
  }

  handleCompanyChange(event: Event) {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;

    this.job.update((job) => ({
      ...job,
      company: {
        ...job?.company,
        [name]: value,
      },
    }));
  }

  handleCreate(event: Event) {
    event.preventDefault();

    console.log(`The current job is: ${JSON.stringify(this.job())}`);
  }
}
