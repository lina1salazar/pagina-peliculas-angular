import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Pelicula } from '../../interfaces/pelicula';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-peliculas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.scss']
})
export class AdminPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  peliculaForm: FormGroup;
  editing: boolean = false;
  currentId: number | null = null;

  posterFile: File | null = null;
  bannerFile: File | null = null;

  constructor(private peliculasService: PeliculasService) {
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
  }

  cargarPeliculas(): void {
    this.peliculasService.getPeliculas().subscribe(res => {
      this.peliculas = res.data;
    });
  }

  onFileSelected(event: Event, type: 'poster_file' | 'banner_file'): void {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (type === 'poster_file') this.posterFile = file;
    if (type === 'banner_file') this.bannerFile = file;
  }

  editarPelicula(pelicula: Pelicula): void {
    this.editing = true;
    this.currentId = pelicula.id_pelicula;
    this.posterFile = null;
    this.bannerFile = null;

    this.peliculaForm.setValue({
      nombre: pelicula.nombre,
      slug: pelicula.slug || '',
      anio: pelicula.anio,
      puntuacion: pelicula.puntuacion,
      duracion: pelicula.duracion,
      actores: (pelicula.actores || []).join(', '),
      generos: (pelicula.generos || []).join(', '),
      sinopsis: pelicula.sinopsis || '',
      poster_file: null,
      banner_file: null
    });
  }

  cancelar(): void {
    this.editing = false;
    this.currentId = null;
    this.posterFile = null;
    this.bannerFile = null;
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
    formData.append('slug', formValue.slug);
    formData.append('anio', formValue.anio.toString());
    formData.append('puntuacion', formValue.puntuacion.toString());
    formData.append('duracion', formValue.duracion.toString());
    formData.append('actores', formValue.actores);
    formData.append('generos', formValue.generos);
    formData.append('sinopsis', formValue.sinopsis);

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
        this.cargarPeliculas();
        this.cancelar();
      },
      error: (err) => console.error('Error al guardar película:', err)
    });
  }

  eliminarPelicula(id: number | undefined): void {
    if (id === undefined) return;
    if (!confirm('¿Seguro que quieres eliminar esta película?')) return;

    this.peliculasService.eliminarPelicula(id).subscribe(() => this.cargarPeliculas());
  }
}
