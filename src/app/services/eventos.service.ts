import { Injectable } from '@angular/core';
import { Evento } from '@app/models/Evento';

@Injectable()
export class EventosService {

    evento: Evento = new Evento();

    constructor() {
        console.log("Servicio Eventos: ", this.evento);
        

    }
}


