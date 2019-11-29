import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { User } from 'src/model/user';
import { UserService } from './user.service';
import { CartService } from './cart.service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private userApi: UserService,
    private cartService: CartService) { }

  userLogin(user): Observable<User> {
    return this.http.post<User>(`${url}/login`, user, httpOptions)
      .pipe(catchError(this.handleError<User>('userLogin')));
  }

  userUpdate() {
    this.userApi.getUser(this.user[0].usu_id).subscribe(res => {
      this.user[0].usu_id = res[0].usu_id;
      this.user[0].usu_nome = res[0].usu_nome;
      this.user[0].usu_senha = res[0].usu_senha;
      this.user[0].usu_perfil = res[0].usu_perfil;
      this.user[0].usu_email = res[0].usu_email;
      this.user[0].usu_telefone = res[0].usu_telefone;
      this.user[0].usu_endereco = res[0].usu_endereco;
    }, err => {
      console.log(err);
    });
  }

  userLogout(): void {
    this.isLogged = false;
    this.isAdmin = false;
    this.user = new User();
    this.cartService.reset();
  }

  redirect() {
    this.router.navigateByUrl("/home");
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
