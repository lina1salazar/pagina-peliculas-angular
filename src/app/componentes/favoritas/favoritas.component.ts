import { Component, Input, OnInit } from '@angular/core';
import { FavoritosService } from '../../servicios/favoritos.service';
import { Pelicula } from '../../interfaces/pelicula';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritas.component.html',
  styleUrls: ['./favoritas.component.scss']
})
export class FavoritasComponent implements OnInit {
  @Input() pelicula!: Pelicula;

  favoritos: Pelicula[] = [];
  cargando: boolean = false;
  error: string | null = null;
  mostrarFavoritos: boolean = false;

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  obtenerFavoritos(): void {
    this.cargando = true;
    this.error = null;
    this.favoritosService.getFavoritos().subscribe({
      next: (data) => {
        this.favoritos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los favoritos';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  agregarAFavoritos(): void {
    if (!this.pelicula) return;
    this.favoritosService.agregarAFavoritos(this.pelicula.id_pelicula).subscribe({
      next: (res) => {
        console.log(res.message);
        this.obtenerFavoritos();
      },
      error: (err) => {
        console.error('Error al agregar a favoritos:', err);
        this.error = 'No se pudo agregar a favoritos';
      }
    });
  }

  eliminarDeFavoritos(pelicula: Pelicula): void {
    this.favoritosService.eliminarDeFavoritos(pelicula.id_pelicula).subscribe({
      next: (res) => {
        console.log(res.message);
        this.obtenerFavoritos();
      },
      error: (err) => {
        console.error('Error al eliminar de favoritos:', err);
        this.error = 'No se pudo eliminar de favoritos';
      }
    });
  }

  toggleFavoritos(): void {
    this.mostrarFavoritos = !this.mostrarFavoritos;
  }
}
