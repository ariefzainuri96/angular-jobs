import { Component, input, output, signal } from '@angular/core';
import {
  CustomSelect,
  TSelectItem,
} from '../custom-select/custom-select.component';
import { CustomInput } from '../custom-input/custom-input.component';
import { JobItem } from '../../../data/model/job-item';
import { CustomArea } from '../custom-area/custom-area.component';
import { ValidationMessage } from '../../../data/model/validation-message';

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
        [errorMessage]="findError('type')"
      ></custom-select>
      <custom-input
        id="title"
        label="Job Title"
        placeholder="eg. Angular Developer"
        (onInputChange)="handleChange($event)"
        [errorMessage]="findError('title')"
      ></custom-input>
      <custom-area
        id="description"
        label="Description"
        placeholder="Add a description of your job"
        (onInputChange)="handleChange($event)"
        [errorMessage]="findError('description')"
      ></custom-area>
      <custom-select
        parentClass="mt-2"
        [items]="jobSalary"
        (onChange)="onSelectChange($event, 'salary')"
        label="Salary"
        [errorMessage]="findError('salary')"
      ></custom-select>
      <custom-input
        id="location"
        label="Location"
        placeholder="Add a location of your job"
        (onInputChange)="handleChange($event)"
        [errorMessage]="findError('location')"
      ></custom-input>
      <p class="mt-4 text-lg font-semibold">Company Info</p>
      <custom-input
        id="name"
        label="Company Name"
        placeholder="Add a company name of your job"
        (onInputChange)="handleCompanyChange($event)"
        [errorMessage]="findError('name', true)"
      ></custom-input>
      <custom-input
        id="description"
        label="Company Description"
        placeholder="Add a company description of your job"
        (onInputChange)="handleCompanyChange($event)"
        [errorMessage]="findError('description', true)"
      ></custom-input>
      <custom-input
        id="contactEmail"
        label="Company Email"
        placeholder="Add a company email of your job"
        (onInputChange)="handleCompanyChange($event)"
        [errorMessage]="findError('contactEmail', true)"
      ></custom-input>
      <custom-input
        id="contactPhone"
        label="Company Phone"
        placeholder="Add a company phone of your job"
        (onInputChange)="handleCompanyChange($event)"
        [errorMessage]="findError('contactPhone', true)"
      ></custom-input>
      <button
        [disabled]="submitStatus() === 'pending'"
        [ariaDisabled]="submitStatus() === 'pending'"
        (click)="handleSubmit($event)"
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
  errorMessage = input<ValidationMessage[] | null>(null);
  submitStatus = input<'error' | 'idle' | 'pending' | 'success'>();
  onSubmit = output<JobItem | null>();

  handleSubmit = (event: Event) => {
    event.preventDefault();

    this.onSubmit.emit(this.job());
  };

  jobType: TSelectItem[] = [
    { content: 'Full-time', value: 'Full-time' },
    { content: 'Part-time', value: 'Part-time' },
    { content: 'Contract', value: 'Contract' },
  ];

  jobSalary: TSelectItem[] = [
    { content: '$100k', value: '$100k' },
    { content: '$200k', value: '$200k' },
    { content: '$300k', value: '$300k' },
    { content: '$400k', value: '$400k' },
    { content: '$500k', value: '$500k' },
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

  findError = (name: string, findCompany?: boolean) => {
    if (findCompany) {
      return (this.errorMessage() ?? []).find(
        (item) => item.name.includes('company') && item.name.includes(name),
      )?.message;
    }

    return (this.errorMessage() ?? []).find((item) => item.name.includes(name))
      ?.message;
  };
}
