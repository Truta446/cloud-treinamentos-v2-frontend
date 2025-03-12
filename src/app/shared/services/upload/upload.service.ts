import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UploadImageModel } from '../../models/upload/upload-image.model';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private apiUrl: string = environment.apiBaseUrl;
  private http: HttpClient = inject(HttpClient);

  public getFile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/v1/upload`);
  }

  public handleUploadFile(data: UploadImageModel): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/v1/upload`, data);
  }
}
