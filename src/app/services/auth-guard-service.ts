import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  canActivate(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }

    return false;
  }
}
