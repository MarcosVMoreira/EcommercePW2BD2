import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from 'src/model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  user: User = new User();

  constructor(private http: HttpClient) { }

  userLogin(user): Observable<User> {
    return this.http.post<User>(`${url}/login`, user, httpOptions)
      .pipe(catchError(this.handleError<User>('userLogin')));
  }

  userLogout(): void {
    this.isLogged = false;
    this.user = new User();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
