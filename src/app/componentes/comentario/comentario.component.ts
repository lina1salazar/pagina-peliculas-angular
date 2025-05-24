import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-comentario',
  imports: [],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
  @Input() nombre!: string;
  @Input() calificacion!: number;
  @Input() fecha!: string;
  @Input() comentario!: string;
}
