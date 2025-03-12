import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SystemInfoModel } from '../../models/system/system-info.model';

@Injectable({ providedIn: 'root' })
export class SystemService {
  private apiUrl: string = environment.apiBaseUrl;
  private http: HttpClient = inject(HttpClient);

  public getSystemInfo(): Observable<SystemInfoModel> {
    return this.http.get<SystemInfoModel>(`${this.apiUrl}/v1/system/info`);
  }
}
