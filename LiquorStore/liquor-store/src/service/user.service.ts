import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from 'src/model/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    createUser(user): Observable<User> {
        return this.http.post<User>(`${url}/usuario`, user, httpOptions)
            .pipe(catchError(this.handleError<User>('createUser')));
    }

    createPurchase(user_id, product_id): Observable<User> {
        return this.http.post<User>(`${url}/salvarCompra`, [user_id, product_id], httpOptions)
            .pipe(catchError(this.handleError<User>('createPurchase')));
    }

    getUser(id): Observable<User> {
        return this.http.get<User>(`${url}/usuario/${id}`)
            .pipe(catchError(this.handleError<User>(`getUser id = ${id}`)));
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${url}/usuario`)
            .pipe(catchError(this.handleError<User[]>('getAllUsers')));
    }

    getUsersByName(name): Observable<User[]> {
        return this.http.get<User[]>(`${url}/busca/usuario/${name}`)
            .pipe(catchError(this.handleError<User[]>(`getUsersByName name= ${name}`)));
    }

    updateUser(id, user): Observable<any> {
        return this.http.put(`${url}/usuario/${id}`, user, httpOptions)
            .pipe(catchError(this.handleError<User>(`updateUser id = ${id}`)));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            return of(result as T);
        };
    }
}
