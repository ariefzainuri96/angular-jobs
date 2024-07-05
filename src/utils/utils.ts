import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard-service';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const isAuthorizedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authGuardService: AuthGuardService = inject(AuthGuardService);
  const isAuthenticated = authGuardService.canActivate();
  return isAuthenticated || router.navigateByUrl('login');
};

export const isLoginRegisterGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authGuardService: AuthGuardService = inject(AuthGuardService);
  const isAuthenticated = authGuardService.canActivate();
  return !isAuthenticated || router.navigateByUrl('');
};
