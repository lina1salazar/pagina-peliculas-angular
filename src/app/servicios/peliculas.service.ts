import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula';
import { ApiResponse } from '../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl: string = 'http://localhost:5000/api/peliculas';

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

  obtenerPeliculaPorSlug(slug: string): Pelicula | undefined {
    // return this.peliculas.find(p => p.slug === slug);
    return undefined;
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
