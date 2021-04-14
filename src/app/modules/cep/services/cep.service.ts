import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private API = 'https://viacep.com.br'
  // https://viacep.com.br/ws/01001000/json/
  constructor(private http: HttpClient) { }

  get(cep: string){
    return this.http.get<Cep>(`${this.API}/ws/${cep}/json/`).pipe(retry(2), catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `code: ${error.status}, message: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}