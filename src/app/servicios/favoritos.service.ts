import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula';
import { ApiResponse } from '../interfaces/apiResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritasService {
  private apiUrl = `${environment.apiUrl}/favoritas`;

  constructor(private http: HttpClient) {}

  // Obtener favoritas (usuario autenticado)
  getFavoritas(): Observable<ApiResponse<Pelicula[]>> {
    return this.http.get<Pelicula[]>(this.apiUrl).pipe(
      map((data) => ({ data } as ApiResponse<Pelicula[]>)),
      catchError(this.handleError)
    );
  }

  // Agregar una película a favoritas
  addFavorita(peliculaId: number): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, { pelicula_id: peliculaId }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una película de favoritas
  deleteFavorita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en favoritas:', error);
    return throwError(() => error);
  }
}
