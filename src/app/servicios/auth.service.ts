import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  registro(usuario: { nombre: string; correo: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar_sesion`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  refrescar(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(`${this.apiUrl}/refrescar`, {}, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access_token);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http.post(`${this.apiUrl}/desconectar`, {}, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }),
      catchError((err) => throwError(() => err))
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUsuario(): { id: number; correo: string; rol: string } | null {
  const token = this.getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.id, correo: payload.correo, rol: payload.rol };
  } catch (error) {
    console.error('Error al decodificar token', error);
    return null;
  }
}
}
