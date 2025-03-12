import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserModel } from '../../models/user/user.model';
import { UpdateUserModel } from '../../models/user/update-user.model';
import { CreateUserModel } from '../../models/user/create-user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl: string = environment.apiBaseUrl;
  private http: HttpClient = inject(HttpClient);

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/v1/users`);
  }

  public getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/v1/users/${id}`);
  }

  public createUser(data: CreateUserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/v1/users`, data);
  }

  public updateUser(id: string, data: UpdateUserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.apiUrl}/v1/users/${id}`, data);
  }

  public deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/v1/users/${id}`);
  }
}
