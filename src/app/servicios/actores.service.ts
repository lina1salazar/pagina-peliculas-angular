import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Actor, ActorCrear } from '../interfaces/actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  private apiUrl = 'http://localhost:5000/api/actores';

  constructor(private http: HttpClient) {}

  getActores(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  crearActor(actor: ActorCrear): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl, actor)
      .pipe(catchError(this.handleError));
  }

  actualizarActor(id: number, actor: ActorCrear): Observable<Actor> {
    return this.http.put<Actor>(`${this.apiUrl}/${id}`, actor)
      .pipe(catchError(this.handleError));
  }

  eliminarActor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    return throwError(() => new Error(error.message || 'Error en el servidor'));
  }
}
