import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-comentario',
  imports: [],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
  @Input() usuario!: string;
  @Input() calificacion!: number;
  @Input() fecha_comentario!: string;
  @Input() contenido!: string;


  get fechaFormateada(): string {
    if (!this.fecha_comentario) return '';
    const fecha = new Date(this.fecha_comentario);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
