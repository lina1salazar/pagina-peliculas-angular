import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comentario } from '../interfaces/comentario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'http://localhost:5000/api/peliculas';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Obtener todos los comentarios de una película
  getComentarios(idPelicula: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${idPelicula}/comentarios`)
      .pipe(
        catchError(err => {
          console.error('Error al obtener comentarios', err);
          return throwError(() => err);
        })
      );
  }

  agregarComentario(comentario: Partial<Comentario>, idPelicula: number): Observable<Comentario> {
    const token = this.authService.getAccessToken();
    if (!token) {
      return throwError(() => new Error('No autenticado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Comentario>(
      `${this.apiUrl}/${idPelicula}/comentarios`,
      comentario,
      { headers }
    ).pipe(
      catchError(err => {
        console.error('Error al agregar comentario', err);
        return throwError(() => err);
      })
    );
  }
}
