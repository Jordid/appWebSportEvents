import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticketservice';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../services/alert.service';
import { EventosService } from '../../../../../../services/eventos.service'
import { ValidacionesFormsService } from '../../../../../../services/validaciones-forms.service';

@Component({
  selector: 'app-form-registro-evento',
  templateUrl: './form-registro-evento.component.html',
  styleUrls: ['./form-registro-evento.component.less']
})
export class FormRegistroEventoComponent implements OnInit {
  forma: FormGroup;
  personalInformation: any;

  constructor(    
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public ticketService: TicketService, 
    private router: Router,
    private eventoService: EventosService,
    private validacionesFormsService: ValidacionesFormsService
  )
  { 
    this.crearFormulario();
  }

  crearFormulario (){
    this.forma = this.formBuilder.group({
      nombre: ['Evento 1', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      provincia: ['A', Validators.required],
      ciudad: ['C', Validators.required],
      fechaInicio: ['2021-02-01', Validators.required],
      fechaFin: ['2021-02-03', Validators.required],
      fechaInicioInscripciones: ['2021-01-14', Validators.required],
      fechaFinInscripciones: ['2021-01-31', Validators.required],
    });
  }

  provincias: any[];
  ciudades: any[];
  ngOnInit() { 
      this.personalInformation = this.ticketService.getTicketInformation().personalInformation;

      this.provincias = [
        {name: 'Seleccione', code: 'S', factor: 0},
        {name: 'Azuay', code: 'A', factor: 1},
        {name: 'Bolivar', code: 'B', factor: 2},
        {name: 'Guayas', code: 'G', factor: 3},
        {name: 'Pichincha', code: 'C', factor: 4}
      ];
      
      this.ciudades = [
        {name: 'Seleccione', code: 'S', factor: 0},
        {name: 'Cuenca', code: 'C', factor: 1},
        {name: 'Guaranda', code: 'G', factor: 2},
        {name: 'Guayaquil', code: 'GU', factor: 3},
        {name: 'Quito', code: 'Q', factor: 4}
      ];

  }
  
  cancelarCreacionEvento () {
    this.router.navigate(['interno/proximoseventos']);
  }

  nextPage() { 
    this.alertService.error(null);
    if (this.forma.valid) {
      /* Mantiene la informacion del evento en el servicio. */
      this.eventoService.evento = this.forma.value;
      this.ticketService.ticketInformation.personalInformation = this.personalInformation;
      this.router.navigate(['interno/nuevo/form-registro-carreras']);
      console.log("Putting evento: ", this.eventoService.evento);     
    } else {
      this.validacionesFormsService.markAsTouched(this.forma);        
    }
  }

  /* Valdiaciones */
  get nombreNovalido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

}
