import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from "../../../../models/Evento";
import { Carrera } from "../../../../models/Carrera";
import { Categoria } from "../../../../models/Categoria";
import { Provincia } from '@app/models/Provincia';
import { Ciudad } from '@app/models/Ciudad';

@Component({
  selector: 'app-listar-proximos-eventos',
  templateUrl: './listar-proximos-eventos.component.html',
  styleUrls: ['./listar-proximos-eventos.component.less']
})
export class ListarProximosEventosComponent implements OnInit {

  lstEventos: Evento[] = new Array();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.lstEventos = this.getProximosEventos();
  }

  getProximosEventos () {
    const lstCategorias: Categoria[] = new Array();
    const categoria: Categoria = new Categoria();
    categoria.idCategoria = 1;
    categoria.nombre = "Categoria masculino";
    categoria.descripcion = "Mi Categoria masculino";
    categoria.codigoValorGenero = 1;
    categoria.edadInicio = 16;
    categoria.edadFin = 20;
    categoria.idCarrera = 1;
    categoria.createdAt = new  Date();
    categoria.createdUser = 1;
    categoria.estado = 1;
    lstCategorias.push(categoria);

    const lstCarreras: Carrera[] = new Array();
    const carrera: Carrera = new Carrera();
    carrera.idCarrera=1;
    carrera.nombre= "Mi carrera 1";
    carrera.descripcion = "Mi carrera de hombres";
    carrera.idCiudad=1;
    carrera.longitud=1611414;
    carrera.latitud=68461651;
    carrera.fechaInicio = new Date();
    carrera.fechaFin= new Date();
    carrera.estado = 1;
    carrera.categorias = lstCategorias;
    carrera.categorias = lstCategorias;
    lstCarreras.push(carrera);

    const evento: Evento = new Evento();
    evento.idEvento = 1;
    evento.nombre = "Evento carrera";
    evento.fechaInicio = new Date();
    evento.fechaFin = new Date();
    evento.fechaInicioInscripcion = new Date();
    evento.fechaFinInscripcion = new Date();
    evento.createdAt = new Date();
    evento.idFuncional = 4;
    evento.urlFotoEvento = "imgs/evento.png";

    const provincia: Provincia = new Provincia();
    provincia.idProvincia = 1;
    provincia.nombre = "AZUAY";    
    const ciudad: Ciudad = new Ciudad();
    ciudad.idCiudad = 1;
    ciudad.nombre = "CUENCA";
    ciudad.provincia = provincia;

    evento.ciudad = ciudad;
    evento.estado = 1;
    evento.codCatValEstadoEvento = 1;
    evento.createdUser = 1;
    evento.carreras = lstCarreras;
    this.lstEventos.push(evento);
    /*this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);
    this.lstEventos.push(evento);*/
    
    //console.log("Eventos: ",this.lstEventos);    
    return this.lstEventos;
  }

  nextPage() { 
    console.log("Registro evento.");      
    this.router.navigate(['interno/nuevo/form-registro-evento']);
    return;  
  }

}
