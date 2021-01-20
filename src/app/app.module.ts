import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';;
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/externos/inicio/inicio.component';
import { EventosExternosComponent } from './components/externos/eventos-externos/eventos-externos.component';
import { ResultadosComponent } from './components/externos/resultados/resultados.component';
import { ModalDatosParticipanteComponent } from './components/externos/resultados/modal-datos-participante/modal-datos-participante.component';
import { ContactosComponent } from './components/externos/contactos/contactos.component';
import { InternalMenuComponent } from './components/internos/internal-menu/internal-menu.component';
import { LoginComponent } from './components/externos/login/login.component';
import { FormCrearUsuarioComponent } from './components/externos/form-crear-usuario/form-crear-usuario.component';
import { MisParticipacionesComponent } from './components/internos/mis-participaciones/mis-participaciones.component';
import { ListarProximosEventosComponent } from './components/internos/proximos-eventos/listar-proximos-eventos/listar-proximos-eventos.component';;
import { MisEventosComponent } from './components/internos/mis-eventos/mis-eventos/mis-eventos.component';
import { StepsComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/steps.component';
import { FormRegistroEventoComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/form-registro-evento/form-registro-evento.component';

import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {CommonModule} from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TicketService } from './components/internos/proximos-eventos/nuevo-evento/steps/ticketservice';
import { EventosService } from './services/eventos.service';
import { GoogleSheetsService } from './services/google.sheets.services';
import { FormRegistroCarrerasComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/form-registro-carreras/form-registro-carreras.component';
import { FormRegistroCategoriasComponent } from './components/internos/proximos-eventos/nuevo-evento/steps/form-registro-categorias/form-registro-categorias.component';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';

import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './services/loader-interceptor.service';
import { BlockUIModule } from 'ng-block-ui';

import { MaterialModule } from './material.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StepsModule,
        ToastModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        CommonModule,
        StepsModule,
		TabViewModule,
		ButtonModule,
		CardModule,
		InputTextModule,
		DropdownModule,
		InputMaskModule,
		CheckboxModule,
		ToastModule,
        FormsModule,
        BlockUIModule.forRoot(),
        MaterialModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        MainComponent ,
        MainMenuComponent ,
        FooterComponent,
        InicioComponent,
        EventosExternosComponent,
        ResultadosComponent,
        ModalDatosParticipanteComponent,
        ContactosComponent,
        LoginComponent,
        FormCrearUsuarioComponent,
        InternalMenuComponent,
        MisParticipacionesComponent ,
        ListarProximosEventosComponent ,
        MisEventosComponent ,
        StepsComponent,
        FormRegistroEventoComponent,
        FormRegistroCarrerasComponent,
        FormRegistroCategoriasComponent,
        MyLoaderComponent
    ],
    providers: [
        LoaderService,
        TicketService,
        EventosService,
        GoogleSheetsDbService,
        GoogleSheetsService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    entryComponents: [ModalDatosParticipanteComponent],
    bootstrap: [AppComponent]
})
export class AppModule { };