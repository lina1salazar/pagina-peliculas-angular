import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { DetalleComponent } from './paginas/detalle/detalle.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    { path: 'detalle/:slug', component: DetalleComponent },
    {path:'contacto', component: ContactoComponent},
    {path:'login', component: LoginComponent},
    {path:'registro', component: RegistroComponent}
];
