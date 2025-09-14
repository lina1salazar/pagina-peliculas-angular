import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { GenerosService } from '../../servicios/generos.service';
import { Genero } from '../../interfaces/generos';

@Component({
  selector: 'app-admin-generos',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './admin-generos.component.html',
  styleUrls: ['./admin-generos.component.scss']
})
export class AdminGenerosComponent implements OnInit {
  generos: Genero[] = [];
  generoForm: FormGroup;
  editGeneroId: number | null = null;
  errorMessage = '';
  exitoMessage = '';

  constructor(private generosService: GenerosService) {
    this.generoForm = new FormGroup({
      nombre: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.cargarGeneros();
  }

  cargarGeneros(): void {
    this.generosService.getGeneros().subscribe({
      next: data => this.generos = data,
      error: () => this.errorMessage = 'Error al cargar géneros'
    });
  }

  guardarGenero(): void {
    if (this.generoForm.invalid) {
      this.generoForm.markAllAsTouched();
      return;
    }

    const datos: Genero = this.generoForm.value;

    if (this.editGeneroId !== null) {
      this.generosService.actualizarGenero(this.editGeneroId, datos).subscribe({
        next: () => {
          this.cargarGeneros();
          this.exitoMessage = 'Género actualizado';
          this.generoForm.reset();
          this.editGeneroId = null;
        },
        error: () => this.errorMessage = 'Error al actualizar género'
      });
    } else {
      this.generosService.crearGenero(datos).subscribe({
        next: () => {
          this.cargarGeneros();
          this.exitoMessage = 'Género creado';
          this.generoForm.reset();
        },
        error: () => this.errorMessage = 'Error al crear género'
      });
    }
  }

  editarGenero(genero: Genero): void {
    this.editGeneroId = genero.id_genero ?? null;
    this.generoForm.setValue({ nombre: genero.nombre });
  }

  eliminarGenero(id?: number): void {
    if (id === undefined) return;
    if (!confirm('¿Seguro que quieres eliminar este género?')) return;

    this.generosService.eliminarGenero(id).subscribe({
      next: () => this.cargarGeneros(),
      error: () => this.errorMessage = 'Error al eliminar género'
    });
  }
}
