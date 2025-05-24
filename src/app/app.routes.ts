import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { DetalleComponent } from './paginas/detalle/detalle.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'detalle', component: DetalleComponent}
];
