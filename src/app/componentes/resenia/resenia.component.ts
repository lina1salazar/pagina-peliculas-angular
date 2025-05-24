import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resenia',
  imports: [],
  templateUrl: './resenia.component.html',
  styleUrl: './resenia.component.scss'
})
export class ReseniaComponent {
  @Input() nombre!: string;
  @Input() calificacion!: number;
  @Input() resenia!: string;

}
