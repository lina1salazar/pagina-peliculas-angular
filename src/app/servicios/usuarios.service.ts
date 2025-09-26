// servicios/usuarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario, UsuarioCrear } from '../interfaces/usuarios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  crearUsuario(usuario: UsuarioCrear): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      catchError(err => throwError(() => err))
    );
  }

  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario).pipe(
      catchError(err => throwError(() => err))
    );
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/me`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  actualizarPerfil(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${environment.apiUrl}/me`, usuario).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
