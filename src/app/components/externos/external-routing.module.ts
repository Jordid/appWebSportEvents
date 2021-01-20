import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutExternoComponent } from './layout-externo/layout-externo.component';
import { ServiciosComponent } from './servicios/servicios.component';

const routes: Routes = [
    {
        path: '', component: LayoutExternoComponent,
        children: [
           // { path: 'inicio', component: InicioComponent },
            { path: 'servicios', component: ServiciosComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExternalRoutingModule { }