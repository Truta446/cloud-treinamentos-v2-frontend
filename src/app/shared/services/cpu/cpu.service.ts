import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CPUService {
  private apiUrl: string = environment.apiBaseUrl;
  private http: HttpClient = inject(HttpClient);

  public handleStartCpu(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/v1/cpu/start`);
  }

  public handleStopCpu(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/v1/cpu/stop`);
  }
}
