import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from 'src/model/user';
import { Product } from 'src/model/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createUser(user): Observable<User> {
    return this.http.post<User>(`${url}/usuario`, user, httpOptions)
      .pipe(catchError(this.handleError<User>('createUser')));
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(`${url}/usuario/${id}`)
      .pipe(catchError(this.handleError<User>(`getUser id = ${id}`)));
  }

  updateUser(id, user): Observable<any> {
    return this.http.put(`${url}/usuario/${id}`, user, httpOptions)
      .pipe(catchError(this.handleError<User>(`updateUser id = ${id}`)));
  }

  getUserProducts(id): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/usuario/produto/${id}`)
      .pipe(catchError(this.handleError<Product[]>(`getUserProducts id= ${id}`)));
  }

  createProduct(product): Observable<Product> {
    return this.http.post<Product>(`${url}/produto`, product, httpOptions)
      .pipe(catchError(this.handleError<Product>('createProduct')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
