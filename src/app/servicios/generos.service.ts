import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Genero {
  id_genero?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  private apiUrl = 'http://localhost:5000/api/generos';

  constructor(private http: HttpClient) {}

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  crearGenero(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl, genero)
      .pipe(catchError(this.handleError));
  }

  actualizarGenero(id: number, genero: Genero): Observable<Genero> {
    return this.http.put<Genero>(`${this.apiUrl}/${id}`, genero)
      .pipe(catchError(this.handleError));
  }

  eliminarGenero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en API de géneros:', error);
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }
}
