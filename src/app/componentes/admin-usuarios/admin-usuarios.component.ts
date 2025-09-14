import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario, UsuarioCrear } from '../../interfaces/usuarios';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  editUsuarioId: number | null = null;
  errorMessage = '';
  exitoMessage = '';

  constructor(private usuariosService: UsuariosService) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('user'),
      contrasena: new FormControl('', [Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: data => this.usuarios = data,
      error: err => this.errorMessage = 'Error al cargar usuarios'
    });
  }

  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const datos: UsuarioCrear = this.usuarioForm.value;

    if (this.editUsuarioId) {
      this.usuariosService.actualizarUsuario(this.editUsuarioId, datos).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.exitoMessage = 'Usuario actualizado';
          this.usuarioForm.reset({ rol: 'user' });
          this.editUsuarioId = null;
        },
        error: () => this.errorMessage = 'Error al actualizar usuario'
      });
    } else {
      this.usuariosService.crearUsuario(datos).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.exitoMessage = 'Usuario creado';
          this.usuarioForm.reset({ rol: 'user' });
        },
        error: () => this.errorMessage = 'Error al crear usuario'
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.editUsuarioId = usuario.id_usuario ?? null;
    this.usuarioForm.setValue({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      contrasena: ''
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: () => this.errorMessage = 'Error al eliminar usuario'
      });
    }
  }
}
