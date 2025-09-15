import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { DetalleComponent } from './paginas/detalle/detalle.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { AdminPeliculasComponent } from './componentes/admin-peliculas/admin-peliculas.component';
import { AdminUsuariosComponent } from './componentes/admin-usuarios/admin-usuarios.component';
import { AdminGuard } from '../app/servicios/adminGuard';
import { AdminActoresComponent } from './componentes/admin-actores/admin-actores.component';
import { AdminGenerosComponent } from './componentes/admin-generos/admin-generos.component';



export const routes: Routes = [
    {path: '', component: InicioComponent},
    { path: 'detalle/:id', component: DetalleComponent },
    { path:'contacto', component: ContactoComponent},
    { path:'login', component: LoginComponent},
    { path:'registro', component: RegistroComponent},
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
    { path: 'admin/peliculas', component: AdminPeliculasComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate: [AdminGuard] },
    { path: 'admin-actores', component: AdminActoresComponent, canActivate: [AdminGuard] },
    { path: 'admin-generos', component: AdminGenerosComponent, canActivate: [AdminGuard] },

    { path: '**', redirectTo: '' }


];
