import { Injectable, signal, effect } from '@angular/core';

export interface Tool {
  id: string;
  title: string;
  description: string;
  url: string;
  color: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  tools = signal<Tool[]>([]);
  
  // Fake stats
  totalViews = signal<number>(12450);

  constructor() {
    const storedTools = localStorage.getItem('rdygic_tools');
    if (storedTools) {
      try {
        this.tools.set(JSON.parse(storedTools));
      } catch (e) {
        this.tools.set(this.getDefaultTools());
      }
    } else {
      this.tools.set(this.getDefaultTools());
    }

    effect(() => {
      localStorage.setItem('rdygic_tools', JSON.stringify(this.tools()));
    });
  }

  addTool(tool: Omit<Tool, 'id' | 'createdAt'>) {
    const newTool: Tool = {
      ...tool,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    this.tools.update(current => [newTool, ...current]);
  }

  removeTool(id: string) {
    this.tools.update(current => current.filter(t => t.id !== id));
  }

  private getDefaultTools(): Tool[] {
    return [
      {
        id: '1',
        title: 'Student Portal',
        description: 'Manage student records and grades.',
        url: '#',
        color: 'bg-blue-600',
        createdAt: Date.now()
      },
      {
        id: '2',
        title: 'Attendance System',
        description: 'Daily attendance tracking for staff.',
        url: '#',
        color: 'bg-emerald-600',
        createdAt: Date.now()
      },
      {
        id: '3',
        title: 'Library Catalog',
        description: 'Search and reserve books.',
        url: '#',
        color: 'bg-amber-600',
        createdAt: Date.now()
      }
    ];
  }
}