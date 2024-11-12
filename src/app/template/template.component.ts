import { Component, OnInit } from '@angular/core';

import { TemplateService } from '../service/template.service';
import { MatDialog } from '@angular/material/dialog';
import { Template } from '../model/template.model';

import { DialogComponent } from '../dialog/dialog.component';
import { PreviewComponent } from '../preview/preview.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TemplateComponent implements OnInit {
  templates: Template[] = [];

  constructor(
    private templateService: TemplateService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.savedTemplates();
  }

  savedTemplates(): void {
    this.templateService.getUsersTemplate().subscribe((templates) => {
      this.templates = templates;
    });
  }

  CreateDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { template: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.getCurrentUser().subscribe((user) => {
          const id = user.id;
          this.templateService.createUsersTemplat(result, id).subscribe(
            (createdTemplate) => {
              console.log('Template created', createdTemplate);
              this.savedTemplates();
            },
            (error) => {
              console.error('Error creating template:', error);
            }
          );
        });
      }
    });
  }

  editTemplate(template: Template): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { mode: 'edit', template },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') this.savedTemplates();
    });
  }

  deleteTemplate(id: number): void {
    this.templateService.deleteTemplate(id).subscribe(() => {
      this.savedTemplates();
    });
  }

  preview(id: number): void {
    this.templateService.getTemplatePreview(id).subscribe((preview) => {
      this.dialog.open(PreviewComponent, {
        width: '500px',
        data: { preview },
      });
    });
  }
}
