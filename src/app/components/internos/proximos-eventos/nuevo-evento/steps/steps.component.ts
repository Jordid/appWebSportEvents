import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Subscription } from 'rxjs';
import { TicketService } from './ticketservice';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.less'],
  providers: [MessageService]
})
export class StepsComponent implements OnInit {

  items: MenuItem[];
    
    subscription: Subscription;

    constructor(public messageService: MessageService, public ticketService: TicketService) {}

    ngOnInit() {
        this.items = [{
                label: 'Registro evento',
                routerLink: 'interno/nuevo/form-registro-evento'
            },
            {
                label: 'Registro carreras',
                routerLink: 'interno/nuevo/form-registro-carreras'
            },
            {
                label: 'Registro categorias',
                routerLink: 'interno/nuevo/form-registro-categorias'
            }/*,
            {
                label: 'Pago',
                routerLink: 'interno/nuevo/form-pago-creacion-evento'
            },
            {
                label: 'Confirmación',
                routerLink: 'interno/nuevo/form-confirmacion-creacion-evento'
            }*/
        ];

        this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
            this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
