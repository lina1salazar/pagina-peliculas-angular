import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.authService.getUsuario();
    if (usuario && usuario.rol === 'admin') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
