import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Product } from 'src/model/product';
import { Category } from 'src/model/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getUserProducts(id): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/usuario/produto/${id}`)
      .pipe(catchError(this.handleError<Product[]>(`getUserProducts id= ${id}`)));
  }

  createProduct(product): Observable<Product> {
    console.log(product)
    return this.http.post<Product>(`${url}/produto`, product, httpOptions)
      .pipe(catchError(this.handleError<Product>('createProduct')));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${url}/categoria`)
      .pipe(catchError(this.handleError<Category[]>('getCategories')));
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/produto`)
      .pipe(catchError(this.handleError<Product[]>('getAllProducts')));
  }

  getProductsByName(name): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/busca/produto/${name}`)
      .pipe(catchError(this.handleError<Product[]>(`getProductsByName name= ${name}`)));
  }

  getProductById(id): Observable<Product> {
    return this.http.get<Product>(`${url}/produto/${id}`)
      .pipe(catchError(this.handleError<Product>(`getProductById id = ${id}`)));
  }

  getProductsByCategory(category): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/produto/categoria/${category}`)
      .pipe(catchError(this.handleError<Product[]>(`getProductByCategory category = ${category}`)));
  }

  updateProduct(id, product): Observable<any> {
    return this.http.put(`${url}/produto/${id}`, product, httpOptions)
      .pipe(catchError(this.handleError<Product>(`updateProduct id = ${id}`)));
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(`${url}/produto/${id}`, httpOptions)
      .pipe(catchError(this.handleError<Product>(`deleteProduct id = ${id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
