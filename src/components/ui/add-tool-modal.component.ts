import { Component, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tool-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        (click)="close.emit()"
      ></div>

      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-[#7f1d1d]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 class="text-xl font-bold leading-6 text-gray-900" id="modal-title">Add New Tool</h3>
                <div class="mt-4">
                  <form [formGroup]="toolForm" (ngSubmit)="onSubmit()" class="space-y-4">
                    
                    <div>
                      <label for="title" class="block text-sm font-medium text-gray-700">Tool Title</label>
                      <input type="text" id="title" formControlName="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm px-3 py-2 border" placeholder="e.g., Staff Portal">
                    </div>

                    <div>
                      <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                      <input type="url" id="url" formControlName="url" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm px-3 py-2 border" placeholder="https://...">
                    </div>

                    <div>
                      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                      <textarea id="description" formControlName="description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm px-3 py-2 border" placeholder="Short description of the tool..."></textarea>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                      <div class="flex gap-3">
                        @for (color of colors; track color.value) {
                          <button 
                            type="button"
                            (click)="selectColor(color.value)"
                            [class]="'w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ' + color.bg + (toolForm.get('color')?.value === color.value ? ' ring-2 ring-offset-2 ring-gray-400 scale-110' : '')"
                          ></button>
                        }
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100">
            <button 
              type="button" 
              (click)="onSubmit()"
              [disabled]="toolForm.invalid"
              class="inline-flex w-full justify-center rounded-md bg-[#7f1d1d] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Add Tool
            </button>
            <button 
              type="button" 
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              (click)="close.emit()"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  `
})
export class AddToolModalComponent {
  close = output<void>();
  add = output<{title: string, description: string, url: string, color: string}>();
  
  private fb = inject(FormBuilder);

  colors = [
    { value: 'bg-red-600', bg: 'bg-red-600' },
    { value: 'bg-blue-600', bg: 'bg-blue-600' },
    { value: 'bg-emerald-600', bg: 'bg-emerald-600' },
    { value: 'bg-amber-500', bg: 'bg-amber-500' },
    { value: 'bg-purple-600', bg: 'bg-purple-600' },
    { value: 'bg-pink-600', bg: 'bg-pink-600' },
  ];

  toolForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    color: ['bg-red-600', Validators.required]
  });

  selectColor(color: string) {
    this.toolForm.patchValue({ color });
  }

  onSubmit() {
    if (this.toolForm.valid) {
      this.add.emit(this.toolForm.value as any);
    }
  }
}