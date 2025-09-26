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
  imports: [NgFor, NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() idPelicula!: number;

  comentarios: Comentario[] = [];
  comentarioForm: FormGroup;
  usuarioAutenticado = false;
  errorMessage = '';

  comentarioEditando: Comentario | null = null;

  usuarioActualId: number | null = null;
  usuarioActualRol: string | null = null;

  constructor(
    private comentariosService: ComentariosService,
    public authService: AuthService
  ) {
    this.comentarioForm = new FormGroup({
      contenido: new FormControl('', [Validators.required, Validators.minLength(5)]),
      calificacion: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)])
    });
  }

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.isAuthenticated();
    const usuario = this.authService.getUsuario();
    this.usuarioActualId = usuario ? usuario.id : null;
    this.usuarioActualRol = usuario ? usuario.rol : null;
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.comentariosService.getComentarios(this.idPelicula).subscribe({
      next: (data) => this.comentarios = data,
      error: (err) => console.error('Error al cargar comentarios', err)
    });
  }

  agregarComentario(): void {
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

    if (this.comentarioEditando) {
      // 🔹 Actualizar comentario existente
      this.comentariosService.actualizarComentario(this.comentarioEditando.id_comentario!, nuevoComentario).subscribe({
        next: (comentario: Comentario) => {
          const index = this.comentarios.findIndex(c => c.id_comentario === comentario.id_comentario);
          if (index !== -1) {
            this.comentarios[index] = comentario;
          }
          this.cancelarEdicion();
          this.cargarComentarios();
        },
        error: (err) => {
          console.error('Error al actualizar comentario', err);
          this.errorMessage = 'No se pudo actualizar el comentario';
        }
      });
    } else {
      // 🔹 Agregar nuevo comentario
      this.comentariosService.agregarComentario(nuevoComentario, this.idPelicula).subscribe({
        next: (comentario: Comentario) => {
          this.comentarios.unshift(comentario);
          this.comentarioForm.reset({ contenido: '', calificacion: 1 });
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

  editarComentario(c: Comentario): void {
    this.comentarioEditando = c;
    this.comentarioForm.setValue({
      contenido: c.contenido,
      calificacion: c.calificacion
    });
  }

  cancelarEdicion(): void {
    this.comentarioEditando = null;
    this.comentarioForm.reset({ contenido: '', calificacion: 1 });
    this.errorMessage = '';
  }

  eliminarComentario(idComentario: number): void {
    if (!confirm('¿Seguro que deseas eliminar este comentario?')) return;

    this.comentariosService.eliminarComentario(idComentario).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter(c => c.id_comentario !== idComentario);
      },
      error: (err) => {
        console.error('Error al eliminar comentario', err);
        this.errorMessage = 'No se pudo eliminar el comentario';
      }
    });
  }
}
