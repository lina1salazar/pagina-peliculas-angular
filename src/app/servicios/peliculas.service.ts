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
  getPeliculas(page: number = 1, per_page: number = 10): Observable<ApiResponse<Pelicula[]>> {
    const url = `${this.apiUrl}?page=${page}&per_page=${per_page}`;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return {
          data: resp.peliculas,
          message: 'ok',
          page: resp.current_page,
          per_page: resp.per_page,
          total_pages: resp.pages,
          total_items: resp.total
        } as ApiResponse<Pelicula[]>;
      }),
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

    if (!params.page) queryParams.push(`page=1`);
    if (!params.per_page) queryParams.push(`per_page=10`);

       const url = `${this.apiUrl}?${queryParams.join('&')}`;

    return this.http.get<any>(url).pipe(
      map((resp) => {
        return {
          data: resp.peliculas,
          message: 'ok',
          page: resp.current_page,
          per_page: resp.per_page,
          total_pages: resp.pages,
          total_items: resp.total
        } as ApiResponse<Pelicula[]>;
      }),
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
    return this.http.get<any>(`${this.apiUrl}?destacadas=true`).pipe(
      map((resp) => resp.peliculas as Pelicula[]),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Código de error:", error.status);
    console.error("Body del backend:", error.error);

    return throwError(() => error);
  }
}
