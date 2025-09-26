import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comentario } from '../interfaces/comentario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Obtener todos los comentarios de una película
  getComentarios(idPelicula: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/peliculas/${idPelicula}/comentarios`)
      .pipe(
        catchError(err => {
          console.error('Error al obtener comentarios', err);
          return throwError(() => err);
        })
      );
  }

  // Agregar un nuevo comentario
  agregarComentario(comentario: Partial<Comentario>, idPelicula: number): Observable<Comentario> {
    const headers = this.getAuthHeaders();
    return this.http.post<Comentario>(
      `${this.apiUrl}/peliculas/${idPelicula}/comentarios`,
      comentario,
      { headers }
    ).pipe(
      catchError(err => {
        console.error('Error al agregar comentario', err);
        return throwError(() => err);
      })
    );
  }

  // Editar un comentario existente
  actualizarComentario(idComentario: number, comentario: Partial<Comentario>): Observable<Comentario> {
    const headers = this.getAuthHeaders();
    return this.http.put<Comentario>(
      `${this.apiUrl}/comentarios/${idComentario}`,
      comentario,
      { headers }
    ).pipe(
      catchError(err => {
        console.error('Error al actualizar comentario', err);
        return throwError(() => err);
      })
    );
  }

  // Eliminar un comentario
  eliminarComentario(idComentario: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(
      `${this.apiUrl}/comentarios/${idComentario}`,
      { headers }
    ).pipe(
      catchError(err => {
        console.error('Error al eliminar comentario', err);
        return throwError(() => err);
      })
    );
  }

  // Helper para headers con token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    if (!token) {
      throw new Error('No autenticado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
