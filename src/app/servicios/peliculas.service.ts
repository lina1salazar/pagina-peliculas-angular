import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pelicula } from '../interfaces/pelicula';
import { ApiResponse } from '../interfaces/apiResponse';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl : string = 'http://localhost:5000/api/peliculas';

  constructor(private http : HttpClient) { }

  getPeliculas(): Observable<ApiResponse<Pelicula[]>> {
    return this.http.get(this.apiUrl)
      .pipe(
        map((data) => ({data} as ApiResponse<Pelicula[]>)),
        catchError(this.handleError)
      );
  }
   obtenerPeliculaPorSlug(slug: string): Pelicula | undefined {
  // return this.peliculas.find(p => p.slug === slug);
  return undefined;
  }

    getPeliculasDestacadas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}?destacadas=true`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error : HttpErrorResponse){
    let errorMessage = 'Ocurrió un error.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Codigo de error: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}

