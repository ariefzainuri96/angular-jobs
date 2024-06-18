import { Injectable, signal } from '@angular/core';
import { sleep } from '../../utils/utils';

type TToast = {
  message: string;
  id: string;
  className?: string;
  duration?: number; // in ms
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<TToast[]>([]);

  show = async (toast: TToast) => {
    this.toasts.update((_toasts) => [..._toasts, toast]);
    await sleep(toast.duration ?? 2000);
    this.remove(toast.id);
  };

  remove = (id: string) =>
    this.toasts.update((_toasts) => _toasts.filter((t) => t.id !== id));
}
