import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CPUService {
  private apiUrl: string = environment.apiBaseUrl;
  private http: HttpClient = inject(HttpClient);

  public handleStartCpu(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/v1/cpu/start`);
  }

  public handleStopCpu(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/v1/cpu/stop`);
  }
}
