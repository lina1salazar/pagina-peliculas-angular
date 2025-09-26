import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../interfaces/usuarios';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario?: Usuario;
  cargando = false;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando = true;
    this.usuariosService.getPerfil().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.perfilForm = this.fb.group({
          nombre: [usuario.nombre, Validators.required],
          correo: [usuario.correo, [Validators.required, Validators.email]]
        });
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil ❌';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.perfilForm.invalid || !this.usuario) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    this.mensaje = '';
    this.error = '';
    this.cargando = true;

    const valores = this.perfilForm.value;

    // Solo enviamos cambios
    const payload: any = {};
    if (valores.nombre !== this.usuario.nombre) {
      payload.nombre = valores.nombre;
    }
    if (valores.correo !== this.usuario.correo) {
      payload.correo = valores.correo;
    }

    if (Object.keys(payload).length === 0) {
      this.mensaje = 'No hay cambios que guardar ⚠️';
      this.cargando = false;
      return;
    }

    this.usuariosService.actualizarPerfil(payload).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.mensaje = 'Perfil actualizado correctamente ✅';
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        this.error = err?.error?.errors
          ? JSON.stringify(err.error.errors)
          : 'No se pudo actualizar el perfil ❌';
        this.cargando = false;
      }
    });
  }
}
