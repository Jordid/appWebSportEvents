import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExternalRoutingModule } from '../externos/external-routing.module';
import { ServiciosComponent } from './servicios/servicios.component';
import { LayoutExternoComponent } from './layout-externo/layout-externo.component';
import { EventosExternosComponent } from './eventos-externos/eventos-externos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContactosComponent } from './contactos/contactos.component';
import { LoginComponent } from './login/login.component';
import { FormCrearUsuarioComponent } from './form-crear-usuario/form-crear-usuario.component';
import { ModalComponent } from './resultados/modal/modal.component';
import { ModalDatosParticipanteComponent } from './resultados/modal-datos-participante/modal-datos-participante.component';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ExternalRoutingModule,
    ],
    declarations: [
        LayoutExternoComponent,
        ServiciosComponent,
        ServiciosComponent,
        ExternalRoutingModule,
        EventosExternosComponent,
        InicioComponent,
        ContactosComponent,
        LoginComponent,
        FormCrearUsuarioComponent,
        ModalComponent,
        ModalDatosParticipanteComponent
        ],
    exports: [
    ]
})
export class ExternalsModule {
}
