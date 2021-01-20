import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticketservice';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../services/alert.service';
import { EventosService } from '../../../../../../services/eventos.service'
@Component({
  selector: 'app-form-registro-categorias',
  templateUrl: './form-registro-categorias.component.html',
  styleUrls: ['./form-registro-categorias.component.less']
})
export class FormRegistroCategoriasComponent implements OnInit {

  forma: FormGroup;
  banderaMostrarFormRegistroCategorias = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public ticketService: TicketService, 
    private router: Router,
    private eventoService: EventosService
  ) {
      this.crearFormulario();
  }

  crearFormulario (){
    this.forma = this.formBuilder.group({
      carrera: ['', [Validators.required, Validators.minLength(5)]],
      nombre: ['Carrera de Juveniles', [Validators.required, Validators.minLength(5)]],
      descripcion: ['Carrera de Juveniles', Validators.required],
      genero: ['', [Validators.required]],
      edadInicio: ['16', [Validators.required]],
      edadFin: ['20', Validators.required],      
    });
  }

  personalInformation: any;

  submitted: boolean = false;

  ngOnInit(): void {
  }

  

  nextPage() {
    this.router.navigate(['interno/proximoseventos']);
  }

  prevPage() {
    this.router.navigate(['interno/nuevo/form-registro-carreras']);
  }

   /* Logica de categorías. */
   mostrarFormRegistroCategorias() {
    this.banderaMostrarFormRegistroCategorias = true;
    console.log("mostrarFormRegistroCarreras...");    
  }

  cancelarAgregacionCategorias() {
    this.router.navigate(['interno/nuevo/form-registro-categorias']);
    this.banderaMostrarFormRegistroCategorias = false;
  }

  cancelarCreacionCategorias() {
    this.router.navigate(['interno/proximoseventos']);
  }

  limpiarFormRegistroCategorias() {
    this.forma.reset();
  }

  agregarCategoriaAlaCarrera() {
    if (this.forma.valid) {      
      //this.eventoService.dataRegistroEvento.categorias = this.forma.value;
      console.log("DataRegistroEvento 3: ", this.eventoService.evento);
      //this.ticketService.ticketInformation.seatInformation = this.seatInformation;
      //this.router.navigate(['interno/nuevo/form-registro-categorias']);
    } else {
      this.alertService.error("Error.");      
      console.log("Invalido creacion categoria: ", this.forma.value);      
    }    
  }


}
