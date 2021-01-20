import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticketservice';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../services/alert.service';
import { EventosService } from '../../../../../../services/eventos.service'
import { Evento } from '@app/models/Evento';
import { Carrera } from '@app/models/Carrera';

@Component({
  selector: 'app-form-registro-carreras',
  templateUrl: './form-registro-carreras.component.html',
  styleUrls: ['./form-registro-carreras.component.less']
})
export class FormRegistroCarrerasComponent implements OnInit {

  forma: FormGroup;
  classes: any[];
  vagons: any[];    
  seats: any[];
  seatInformation: any;
  ciudades: any[];
  tiposCarreras: any[];
  banderaMostrarFormRegistroCarreras = false;

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
      nombre: ['Carrera de corredores a pie', [Validators.required, Validators.minLength(5)]],
      descripcion: ['Carrera de pista', [Validators.required, Validators.minLength(5)]],
      idCiudad: ['CUE', Validators.required],
      latitud: ['2956191', [Validators.required]],
      longitud: ['1624648948', [Validators.required]],
      fechaInicio: ['2021-02-01', Validators.required],
      horaInicio: ['09:30', [Validators.required]],
      distancia: ['5', [Validators.required]],
      idTipoCarrera: ['AM', [Validators.required]],
      motivo: ['N'],
    });
  }   

  ngOnInit() { 
    this.seatInformation = this.ticketService.ticketInformation.seatInformation;
    
    this.ciudades = [
      //{name: 'Seleccione', code: 'S', factor: 0},
      {name: 'Cuenca', code: 'CUE', factor: 1},
      {name: 'Guaranda', code: 'G', factor: 2},
      {name: 'Guayaquil', code: 'GU', factor: 3},
      {name: 'Quito', code: 'Q', factor: 4}
    ];

    this.tiposCarreras = [
     // {name: 'Seleccione', code: 'S'},
      {name: 'A pie - asfalto', code: 'AA'},
      {name: 'A pie - montaña', code: 'AM'},
      {name: 'MTB',             code: 'MT'},
      {name: 'Ciclismo',        code: 'CI'},
      {name: 'Duatlon',         code: 'DU'},
      {name: 'Triatlon',        code: 'TR'},
      {name: 'Acuatlon',        code: 'AC'},
      {name: 'Natación',           code: 'NA'},
      {name: 'Ciclismo - turismo', code: 'CT'},

    ];
  }

  /* Valdiaciones */
  get nombreNovalido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get descripcionNovalido() {
    return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched
  }

  get distanciaNovalido() {
    return this.forma.get('distancia').invalid && this.forma.get('distancia').touched
  }

  get tipoCarreraNovalido() {
    return this.forma.get('idTipoCarrera').invalid && this.forma.get('idTipoCarrera').touched
  }

  /* Logica de carreras. */
  mostrarFormRegistroCarreras() {
    this.banderaMostrarFormRegistroCarreras = true;
    console.log("mostrarFormRegistroCarreras...");    
  }

  cancelarAgregacionCarrera() {
    this.banderaMostrarFormRegistroCarreras = false;
    console.log("cancelarAgregacionCarrera...");  
  }

  limpiarFormRegistroCarreras() {
    this.forma.reset();
    console.log("limpiarFormRegistroCarreras");
  }

  agregarCarreraAlEvento() {
    //debugger;
    if (this.forma.valid) {
      const carreras = this.getCarreras();      
      const carrera = this.forma.value;
      carrera.nombreCiudad = this.getNombreCiudad(carrera.idCiudad);
      carrera.tipoCarreraValor = this.getTpoCarreraValor(carrera.idTipoCarrera);
      carreras.push(carrera);
      this.setCarreras(carreras);

      console.log("Carrera agregada: ", this.forma.value);

      this.ticketService.ticketInformation.seatInformation = this.seatInformation;
      this.banderaMostrarFormRegistroCarreras = false; 

    } else {
      console.log("Form creacion de carreras invalido...");        
    }
  }

  cancelarCreacionCarreras () {
    this.router.navigate(['interno/proximoseventos']);
  }

  nextPage() {
    this.router.navigate(['interno/nuevo/form-registro-categorias']);
    console.log("DataRegistroEvento 1: ", this.eventoService.evento);
  }

  prevPage() {
    this.router.navigate(['interno/nuevo/form-registro-evento']);
  }

  getEvento(): Evento {
    return this.eventoService.evento;
  }

  getCarreras(): Carrera[] {
    const evento = this.getEvento();
    let lstCarreras = evento? evento.carreras: null;
    if (!lstCarreras) {
      lstCarreras = new Array();
    }    
    return lstCarreras;
  }

  setCarreras(lstCarreras: Carrera[]) {
    const evento = this.getEvento();
    evento.carreras = lstCarreras;
    this.eventoService.evento = evento;

  }

  getNombreCiudad(idCiudad: number): string {
    let nombreCiudad = "";
    if (idCiudad && this.ciudades && this.ciudades.length > 0) {
      const ciudad = this.ciudades.find(ciudad => ciudad.code = idCiudad);
      if (ciudad) {
        nombreCiudad = ciudad.name;
      }
    }
    return nombreCiudad;
  }

  getTpoCarreraValor(idTipoCarrera: number): string {
    let tipoCarreraValor = "";
    if (idTipoCarrera && this.tiposCarreras && this.tiposCarreras.length > 0) {
      const tipoCarrera = this.tiposCarreras.find(tipoCarrera => tipoCarrera.code = idTipoCarrera);
      if (tipoCarrera) {
        tipoCarreraValor = tipoCarrera.name;
      }
    }
    return tipoCarreraValor;
  }
  

}
