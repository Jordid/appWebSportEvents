import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/externos/inicio/inicio.component';
import { EventosExternosComponent } from './components/externos/eventos-externos/eventos-externos.component';
import { ResultadosComponent } from './components/externos/resultados/resultados.component';
import { ContactosComponent } from './components/externos/contactos/contactos.component';
import { AuthGuard } from './_helpers';
import { InternalMenuComponent } from './components/internos/internal-menu/internal-menu.component';
import { MisParticipacionesComponent } from './components/internos/mis-participaciones/mis-participaciones.component';
import { ListarProximosEventosComponent } from './components/internos/proximos-eventos/listar-proximos-eventos/listar-proximos-eventos.component';
import { MisEventosComponent } from './components/internos/mis-eventos/mis-eventos/mis-eventos.component';
import { StepsComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/steps.component';
import { FormRegistroEventoComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/form-registro-evento/form-registro-evento.component';
import { FormRegistroCarrerasComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/form-registro-carreras/form-registro-carreras.component';
import { FormRegistroCategoriasComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/form-registro-categorias/form-registro-categorias.component';
import { LoginComponent } from './components/externos/login/login.component';
import { FormCrearUsuarioComponent } from './components/externos/form-crear-usuario/form-crear-usuario.component';

const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'externo/inicio', component: InicioComponent },
    { path: 'externo/eventos', component:  EventosExternosComponent},
    { path: 'externo/resultados', component:  ResultadosComponent},
    { path: 'externo/contactos', component:  ContactosComponent},
    { path: 'externo/login', component:  LoginComponent},
    { path: 'externo/crearusuario', component:  FormCrearUsuarioComponent},

    { path: 'interno', component:  InternalMenuComponent,
        children: [
            { path: 'misparticipaciones', component:  MisParticipacionesComponent},
            { path: 'miseventos', component:  MisEventosComponent},
            { path: 'proximoseventos', component:  ListarProximosEventosComponent},
            { path: 'nuevo', component:  StepsComponent,
                children: [
                    { path: 'form-registro-evento', component:  FormRegistroEventoComponent},
                    { path: 'form-registro-carreras', component:  FormRegistroCarrerasComponent},
                    { path: 'form-registro-categorias', component:  FormRegistroCategoriasComponent}                    
                ]
            }
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }