import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Pelicula } from '../../interfaces/pelicula';
import { Observable } from 'rxjs';
import { GenerosService } from '../../servicios/generos.service';
import { ActoresService } from '../../servicios/actores.service';
import { Genero } from '../../interfaces/generos';
import { Actor } from '../../interfaces/actor';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-peliculas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.scss']
})
export class AdminPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  generos: Genero[] = [];
  actores: Actor[] = [];
  peliculaForm: FormGroup;
  paginaActual: number = 1;
  totalPaginas: number = 0;
  totalItems: number = 0;
  perPage: number = 10;
  loading: boolean = false;
  editing: boolean = false;
  currentId: number | null = null;

  errores: { [key: string]: string[] } = {};
  mensajeError: string | null = null;

  posterFile: File | null = null;
  bannerFile: File | null = null;

  posterUrl: string | null = null;
  bannerUrl: string | null = null;
  

  constructor(
      private peliculasService: PeliculasService,
      private generosService: GenerosService,
      private actoresService: ActoresService,
      private router: RouterModule
    ) {
    this.peliculaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      anio: new FormControl(new Date().getFullYear(), [Validators.required, Validators.min(1900)]),
      puntuacion: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10)]),
      duracion: new FormControl(0, Validators.required),
      actores: new FormControl(''),
      generos: new FormControl(''),
      sinopsis: new FormControl(''),
      poster_file: new FormControl(null),
      banner_file: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.cargarPeliculas();
    this.cargarGeneros();
    this.cargarActores();
  }

  cargarPeliculas(page: number = 1): void {
    this.loading = true;
    this.peliculasService.getPeliculas(page, this.perPage).subscribe({
      next: (res) => {
        console.log('Respuesta getPeliculas (admin):', res);
        this.peliculas = res.data;
        this.paginaActual = res.page ?? 1;
        this.totalPaginas = res.total_pages ?? 1;
        this.totalItems = res.total_items ?? 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar películas (admin):', err);
        this.loading = false;
      }
    });
  }

    paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cargarPeliculas(this.paginaActual - 1);
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.cargarPeliculas(this.paginaActual + 1);
    }
  }


  cargarGeneros(): void {
    this.generosService.getGeneros().subscribe(res => {
      this.generos = res;
    });
  }
  cargarActores(): void {
    this.actoresService.getActores().subscribe(res => {
      this.actores = res;
    });
  }

  get erroresArray(): { campo: string, mensaje: string }[] {
    return Object.entries(this.errores).map(([campo, mensajes]) => ({
      campo,
      mensaje: mensajes[0]
    }));
  }

  onFileSelected(event: Event, type: 'poster_file' | 'banner_file'): void {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (type === 'poster_file') this.posterFile = file;
    if (type === 'banner_file') this.bannerFile = file;
  }

  editarPelicula(id_pelicula: number): void {
    this.editing = true;
    this.currentId = id_pelicula;
    this.posterFile = null;
    this.bannerFile = null;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.peliculasService.getPelicula(id_pelicula).subscribe(res => {
      const pelicula = res as Pelicula;
      this.posterUrl = pelicula.poster_url || null;
      this.bannerUrl = pelicula.banner_url || null;
      this.peliculaForm.setValue({
        nombre: pelicula.nombre,
        slug: pelicula.slug,
        anio: pelicula.anio,
        puntuacion: pelicula.puntuacion,
        duracion: pelicula.duracion,
        actores: pelicula.actores.map(actor => actor.id_actor) || [],
        generos: pelicula.generos.map(genero => genero.id_genero) || [],
        sinopsis: pelicula.sinopsis || '',
        poster_file: null,
        banner_file: null
      });
    })

    
  }

  cancelar(): void {
    this.editing = false;
    this.currentId = null;
    this.posterFile = null;
    this.bannerFile = null;
    this.posterUrl = null;
    this.bannerUrl = null;
    this.peliculaForm.reset({
      nombre: '',
      slug: '',
      anio: new Date().getFullYear(),
      puntuacion: 0,
      duracion: 0,
      actores: '',
      generos: '',
      sinopsis: '',
      poster_file: null,
      banner_file: null
    });
  }

  guardar(): void {
    const formValue = this.peliculaForm.value;
    
    
    // Crear FormData para enviar a la API
    const formData = new FormData();
    formData.append('nombre', formValue.nombre);
    formData.append('anio', formValue.anio.toString());
    formData.append('puntuacion', formValue.puntuacion.toString());
    formData.append('duracion', formValue.duracion.toString());
    formData.append('sinopsis', formValue.sinopsis);
    // Agregar actores y géneros como arreglos
    if (Array.isArray(formValue.actores)) {
      formValue.actores.forEach((actorId: number) => formData.append('actores', actorId.toString()));
    }
    if (Array.isArray(formValue.generos)) {
      formValue.generos.forEach((generoId: number) => formData.append('generos', generoId.toString()));
    }
    
    if (this.posterFile) formData.append('poster', this.posterFile);
    if (this.bannerFile) formData.append('banner', this.bannerFile);

    let request$: Observable<Pelicula>;

    if (this.editing && this.currentId !== null) {
      request$ = this.peliculasService.actualizarPelicula(this.currentId, formData);
    } else {
      request$ = this.peliculasService.crearPelicula(formData);
    }

    request$.subscribe({
      next: () => {
        this.cargarPeliculas(this.paginaActual);
        this.cancelar();
      },
      error: (err) =>{
        console.error('Error completo:', err);
        console.error('err.error.errors:', err.error?.errors);

        if (err.error && err.error.errors) {
          this.errores = err.error.errors;
        } else {
          this.mensajeError = err.error?.message || 'Error al guardar la película.';
        }
      }
    });
  }

  eliminarPelicula(id: number | undefined): void {
    if (id === undefined) return;
    if (!confirm('¿Seguro que quieres eliminar esta película?')) return;

    this.peliculasService.eliminarPelicula(id).subscribe(() => this.cargarPeliculas());
  }  
}

