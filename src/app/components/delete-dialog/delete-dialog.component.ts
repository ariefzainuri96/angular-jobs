import { Component, input, output } from '@angular/core';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [],
  template: `
    <dialog [id]="modalId()" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Are you sure you want to delete this item?</p>
        <div class="mt-2 flex flex-row items-center justify-end gap-4">
          <button (click)="closeModal()" class="btn">Close</button>
          <button (click)="onDeleteClick.emit()" class="btn btn-primary">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  `,
})
export class DeleteDialog {
  modalId = input.required<string>();
  onDeleteClick = output<void>();

  closeModal = () => {
    (document.getElementById(this.modalId()) as HTMLDialogElement)?.close();
  };
}
