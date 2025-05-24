import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavegacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NickPelis';
}
