import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template } from '../model/template.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private templateUrl = 'http://localhost:3000/template';

  constructor(private http: HttpClient) {}

  createUsersTemplat(template: Template, id: number): Observable<any> {
    return this.http.post<Template>(
      `${this.templateUrl}/create/${id}`,
      template,
      {
        withCredentials: true,
      }
    );
  }

  getUsersTemplate(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.templateUrl}/user`, {
      withCredentials: true,
    });
  }

  getTemplatePreview(id: number): Observable<string> {
    return this.http.get<string>(`${this.templateUrl}/${id}/preview`, {
      withCredentials: true,
    });
  }

  updateTemplate(id: number, template: Template): Observable<Template> {
    return this.http.put<Template>(`${this.templateUrl}/${id}`, template, {
      withCredentials: true,
    });
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.templateUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
