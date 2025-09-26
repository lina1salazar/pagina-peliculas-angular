import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = `${environment.apiUrl}/favoritas`;

  constructor(private http: HttpClient) {}

  // Obtener favoritos
  getFavoritos(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar a favoritos
  agregarAFavoritos(id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_pelicula: id }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar de favoritos
  eliminarDeFavoritos(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Código de error:', error.status);
    console.error('Body del backend:', error.error);
    return throwError(() => error);
  }
}
