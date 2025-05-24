import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path:'contacto', component: ContactoComponent}
];
