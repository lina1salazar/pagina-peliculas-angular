import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../servicios/favoritos.service';
import { AuthService } from '../../servicios/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-boton-favoritas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-favoritas.component.html',
  styleUrls: ['./boton-favoritas.component.scss']
})
export class BotonFavoritasComponent implements OnInit {
  @Input() peliculaId!: number;
  enFavoritos = false;
  cargando = false;
  usuarioAutenticado = false;

  constructor(
    private favoritosService: FavoritosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.isAuthenticated();

    if (this.peliculaId && this.usuarioAutenticado) {
      this.verificarSiEsFavorito();
    }
  }

  private verificarSiEsFavorito(): void {
    this.favoritosService.getFavoritos().pipe(take(1)).subscribe({
      next: (favoritos) => {
        this.enFavoritos = favoritos.some(p => p.id_pelicula === this.peliculaId);
      },
      error: (err) => {
        console.error('Error al verificar favoritos:', err);
      }
    });
  }

  toggleFavorito(): void {
    if (!this.usuarioAutenticado) {
      alert('Debes iniciar sesión para agregar o quitar favoritos');
      return;
    }

    if (!this.peliculaId || this.cargando) return;

    this.cargando = true;
    if (this.enFavoritos) {
      this.favoritosService.eliminarDeFavoritos(this.peliculaId).subscribe({
        next: () => {
          this.enFavoritos = false;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al eliminar de favoritos:', err);
          this.cargando = false;
        }
      });
    } else {
      this.favoritosService.agregarAFavoritos(this.peliculaId).subscribe({
        next: () => {
          this.enFavoritos = true;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al agregar a favoritos:', err);
          this.cargando = false;
        }
      });
    }
  }
}
