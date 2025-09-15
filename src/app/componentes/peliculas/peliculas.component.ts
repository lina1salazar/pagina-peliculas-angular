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
  templateUrl: './peliculas.component.html'
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
  

  constructor(private peliculasService: PeliculasService,private router: Router) {}

  ngOnInit(): void {
    console.log('PeliculasComponent initialized');
    this.cargarPeliculas();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

cargarPeliculas(): void {
  this.loading = true;
  this.error = null;
  this.peliculasService.getPeliculas().subscribe({
    next: (response) => {
      this.peliculas = response.data;
      this.generos = this.obtenerGenerosUnicos(this.peliculas);
      this.anios = this.obtenerAniosUnicos(this.peliculas);
      this.loading = false;
    },
    error: (err) => {
      this.error = err.message || 'Error al cargar las películas.';
      this.loading = false;
    }
  });
}

get peliculasFiltradas(): Pelicula[] {
  return this.peliculas.filter(pelicula => {
    const coincideGenero = this.filtroGenero === '' || pelicula.generos.includes(this.filtroGenero as any);
    const coincideAnio = this.filtroAnio === '' || pelicula.anio.toString() === this.filtroAnio;
    const coincideBusqueda = this.filtroBusqueda === '' ||
      pelicula.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase());
    return coincideGenero && coincideAnio && coincideBusqueda;
  });
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
