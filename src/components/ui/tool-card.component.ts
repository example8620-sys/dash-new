import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Tool } from '../../services/tool.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col h-full animate-fade-in">
      
      <!-- Top Decorator -->
      <div [class]="'absolute top-0 left-0 w-full h-1.5 rounded-t-xl ' + tool().color"></div>

      <div class="flex justify-between items-start mb-4 mt-2">
        <div [class]="'w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm ' + tool().color">
           <!-- Generic Icon -->
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
        </div>
        <button 
          (click)="onDelete($event)"
          class="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
          title="Remove Tool"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>

      <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#7f1d1d] transition-colors line-clamp-1">
        {{ tool().title }}
      </h3>
      
      <p class="text-sm text-gray-500 mb-6 flex-grow line-clamp-2">
        {{ tool().description }}
      </p>

      <a 
        [href]="tool().url" 
        target="_blank" 
        class="inline-flex items-center justify-center w-full py-2.5 px-4 bg-gray-50 hover:bg-[#7f1d1d] text-gray-700 hover:text-white font-medium rounded-lg transition-all duration-200 text-sm group-hover:shadow-md"
      >
        Access Tool
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class ToolCardComponent {
  tool = input.required<Tool>();
  delete = output<string>();

  onDelete(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.delete.emit(this.tool().id);
  }
}