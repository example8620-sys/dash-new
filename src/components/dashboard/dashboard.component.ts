import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToolService, Tool } from '../../services/tool.service';
import { AddToolModalComponent } from '../ui/add-tool-modal.component';
import { ToolCardComponent } from '../ui/tool-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, DecimalPipe, AddToolModalComponent, ToolCardComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  authService = inject(AuthService);
  toolService = inject(ToolService);
  private router = inject(Router) as Router;

  isModalOpen = signal(false);

  user = this.authService.currentUser;
  tools = this.toolService.tools;
  totalViews = this.toolService.totalViews;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  handleAddTool(toolData: {title: string, description: string, url: string, color: string}) {
    this.toolService.addTool(toolData);
    this.closeModal();
  }

  handleDeleteTool(id: string) {
    if(confirm('Are you sure you want to remove this tool?')) {
      this.toolService.removeTool(id);
    }
  }
}