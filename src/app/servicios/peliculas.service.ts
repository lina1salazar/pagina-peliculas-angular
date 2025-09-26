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
export class PeliculasService {
  private apiUrl = `${environment.apiUrl}/peliculas`;

  constructor(private http: HttpClient) { }

  // Obtener todas las películas
  getPeliculas(): Observable<ApiResponse<Pelicula[]>> {
    return this.http.get<Pelicula[]>(this.apiUrl).pipe(
      map((data) => ({ data } as ApiResponse<Pelicula[]>)),
      catchError(this.handleError)
    );
  }

  // Obtener película por id
  getPelicula(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getPeliculasFiltradas(params: { genero?: string; anio?: string; q?: string; sort?: string; order?: string; page?: string; per_page?: string } = {}): Observable<ApiResponse<Pelicula[]>> {
    const queryParams: string[] = [];
    if (params.genero) queryParams.push(`genero=${encodeURIComponent(params.genero)}`);
    if (params.anio) queryParams.push(`anio=${encodeURIComponent(params.anio)}`);
    if (params.q) queryParams.push(`q=${encodeURIComponent(params.q)}`);
    if (params.sort) queryParams.push(`sort=${encodeURIComponent(params.sort)}`);
    if (params.order) queryParams.push(`order=${encodeURIComponent(params.order)}`);
    if (params.page) queryParams.push(`page=${params.page}`);
    if (params.per_page) queryParams.push(`per_page=${params.per_page}`);


    const url = queryParams.length > 0 ? `${this.apiUrl}?${queryParams.join('&')}` : this.apiUrl;

    return this.http.get<Pelicula[]>(url).pipe(
      map((data) => ({ data } as ApiResponse<Pelicula[]>)),
      catchError(this.handleError)
    );
  }

  // Crear nueva película (solo admin)
  crearPelicula(formData: FormData): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar película existente (solo admin)
  actualizarPelicula(id: number, formData: FormData): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar película (solo admin)
  eliminarPelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Películas destacadas
  getPeliculasDestacadas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}?destacadas=true`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Código de error:", error.status);
    console.error("Body del backend:", error.error);

    return throwError(() => error);
  }
}
