import { Component, inject, signal } from '@angular/core';
import { CustomInput } from '../components/custom-input/custom-input.component';
import { authSchema } from '../../data/schema/auth-schema';
import { ValidationMessage } from '../../data/model/validation-message';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { axiosInstance } from '../../data/axios';
import { LoginResponse } from '../../data/responses/login-response';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AxiosError } from 'axios';
import { CommonModule } from '@angular/common';

export type AuthForm = {
  email?: string;
  password?: string;
};

export type UserData = {
  email: string;
  token: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CustomInput, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen w-screen items-center justify-center bg-blue-50">
      <div class="base-card">
        <form (submit)="handleSubmit($event)">
          <custom-input
            label="Email"
            id="email"
            placeholder="Enter your email"
            (onInputChange)="handleChange($event)"
            [errorMessage]="findError('email')"
          />
          <custom-input
            label="Password"
            id="password"
            placeholder="****"
            (onInputChange)="handleChange($event)"
            [errorMessage]="findError('password')"
          />
          <button
            [ariaDisabled]="mutation.isPending()"
            [disabled]="mutation.isPending()"
            class="btn btn-primary mt-4 w-full"
            type="submit"
          >
            Login
            <span
              *ngIf="mutation.isPending()"
              class="loading loading-spinner loading-xs"
            ></span>
          </button>
        </form>
        <p class="mt-4 self-center text-center text-sm text-gray-500">
          Don't have an account?
          <a
            routerLink="/register"
            routerLinkActive="active"
            class="text-blue-500 underline"
            >Register</a
          >
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  router = inject(Router);
  authForm = signal<AuthForm | null>(null);
  errorMessage = signal<ValidationMessage[] | null>(null);

  handleChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    this.authForm.update((form) => ({
      ...form,
      [name]: value,
    }));
  }

  mutation = injectMutation(() => ({
    mutationFn: async () => {
      this.errorMessage.set(null);

      const data = (
        await axiosInstance(false).post<LoginResponse>(
          '/users/login',
          JSON.stringify(this.authForm()),
        )
      ).data;
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: this.authForm()?.email,
          token: data.data,
        } as UserData),
      );

      this.router.navigateByUrl('/', {
        replaceUrl: true,
      });
    },
    onError: (error) => {
      this.errorMessage.set([
        {
          message:
            error instanceof AxiosError
              ? error.response?.data.message
              : 'Something went wrong',
          name: ['password'],
        },
      ]);
    },
  }));

  handleSubmit(event: Event) {
    event.preventDefault();

    const validation = authSchema.safeParse(this.authForm() ?? {});

    if (!validation.success) {
      const { errors: err } = validation.error;

      console.log(err);

      this.errorMessage.set(
        err.map((element) => {
          return {
            message: element.message,
            name: element.path,
          } as ValidationMessage;
        }),
      );

      return;
    }

    this.mutation.mutate();
  }

  findError = (name: string) => {
    return (this.errorMessage() ?? []).find((item) => item.name.includes(name))
      ?.message;
  };
}
