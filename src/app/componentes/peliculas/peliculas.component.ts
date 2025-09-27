import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../servicios/peliculas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  filtroGenero: string = '';
  filtroAnio: string = '';
  generos: string[] = [];
  anios: number[] = [];
  filtroBusqueda: string = '';
  loading: boolean = false;
  error : string | null = null;
  
  paginaActual: number = 1;
  itemsPorPagina: number = 12;
  totalPaginas: number = 1;
  totalItems: number = 0;

  ordenCampo: string = 'anio';
  ordenDir: string = 'asc';
  

  constructor(private peliculasService: PeliculasService,private router: Router) {}

  ngOnInit(): void {
    this.filtrarPeliculas();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

filtrarPeliculas(): void {
  this.loading = true;
  this.error = null;
  this.peliculasService.getPeliculasFiltradas({
    genero: this.filtroGenero,
    anio: this.filtroAnio,
    q: this.filtroBusqueda,
    sort: this.ordenCampo,
    order: this.ordenDir,
    page: String(this.paginaActual),
    per_page: String(this.itemsPorPagina)
  }).subscribe({
    next: (response) => {
      this.peliculas = response.data;
      this.totalItems = response.total_items ?? 0;
      this.paginaActual = response.page ?? 1;
      this.totalPaginas = response.total_pages ?? 1;
      this.generos = this.obtenerGenerosUnicos(this.peliculas);
      this.anios = this.obtenerAniosUnicos(this.peliculas);
      this.loading = false;
    },
    error: (err) => {
      this.error = err.message || 'Error al filtrar las películas.';
      this.loading = false;
    }
  });
}
  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.filtrarPeliculas();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.filtrarPeliculas();
    }
  }


  private obtenerGenerosUnicos(peliculas: Pelicula[]): string[] {
    const generosSet = new Set<string>();
    peliculas.forEach(p => p.generos.forEach(g => generosSet.add(String(g))));
    return Array.from(generosSet).sort();
  }

  private obtenerAniosUnicos(peliculas: Pelicula[]): number[] {
    const aniosSet = new Set<number>();
    peliculas.forEach(p => aniosSet.add(p.anio));
    return Array.from(aniosSet).sort((a, b) => b - a);
  }
}
