import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Comentario } from '../../interfaces/comentario';
import { ComentariosService } from '../../servicios/comentarios.service';
import { AuthService } from '../../servicios/auth.service';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [ComentarioComponent, NgFor, NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() idPelicula!: number;
  comentarios: Comentario[] = [];
  comentarioForm: FormGroup;
  usuarioAutenticado = false;
  errorMessage = '';

  constructor(
    private comentariosService: ComentariosService,
    private authService: AuthService
  ) {
    this.comentarioForm = new FormGroup({
      contenido: new FormControl('', [Validators.required, Validators.minLength(5)]),
      calificacion: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)])
    });
  }

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.isAuthenticated();
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.comentariosService.getComentarios(this.idPelicula).subscribe({
      next: (data) => this.comentarios = data,
      error: (err) => console.error('Error al cargar comentarios', err)
    });
  }

  agregarComentario(): void {
    console.log('Agregar comentario llamado');
    if (!this.usuarioAutenticado) {
      this.errorMessage = 'Debes iniciar sesión para comentar';
      return;
    }

    if (this.comentarioForm.invalid) {
      this.comentarioForm.markAllAsTouched();
      this.errorMessage = 'Por favor, corrige los errores antes de enviar.';
      return;
    }

    const nuevoComentario: Partial<Comentario> = {
      contenido: this.comentarioForm.value.contenido,
      calificacion: this.comentarioForm.value.calificacion,
    };

    this.comentariosService.agregarComentario(nuevoComentario, this.idPelicula).subscribe({
      next: (comentario: Comentario) => {
        this.comentarios.push(comentario);
        this.comentarioForm.reset({ contenido: '', calificacion: 0 });
        this.errorMessage = '';
        this.cargarComentarios();
      },
      error: (err) => {
        console.error('Error al agregar comentario', err);
        this.errorMessage = 'No se pudo agregar el comentario';
      }
    });
  }
}
