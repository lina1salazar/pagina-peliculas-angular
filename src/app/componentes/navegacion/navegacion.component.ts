import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent {

  constructor(public authService: AuthService, private router : Router) {}

  logout() : void {
    this.authService.logout().subscribe({
      next: () =>{
        this.router.navigate(['/login']);
      },
      error: (err: Error) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }
}
