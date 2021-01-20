import { Component, OnInit } from '@angular/core';
import { GoogleSheetsService } from '../../../services/google.sheets.services';
import { Participante } from '../../../models/Participante';
import { CatalogoValor } from '../../../models/CatalogoValor';

import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '@app/services/account.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDatosParticipanteComponent } from './modal-datos-participante/modal-datos-participante.component';
interface DialogData {
  data: Participante;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.less']
})
export class ResultadosComponent implements OnInit {
  forma: FormGroup;

  listaParticipantesAllCategorias: Participante[] = new Array();

  listaParticipantes: Participante[] = new Array();
  respaldoParticipantes: Participante[] = new Array();

  categoria2 = new Array();
  banderaFin: boolean  = false;

  categorias: CatalogoValor[] = new Array();
  generos: CatalogoValor[] = new Array();
  eventos: CatalogoValor[] = new Array();
  distancias: CatalogoValor[] = new Array();
  //finCargaDatos = false;
  catalogoDefecto: CatalogoValor = null;


  constructor(
    private googleShteetsService: GoogleSheetsService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {
    this.catalogoDefecto = new CatalogoValor();
    this.catalogoDefecto.codigo = 0;
    this.catalogoDefecto.valor = "Seleccione";
    this.crearFormulario();
  }

  crearFormulario (){
    this.forma = this.formBuilder.group(
      {
        categoria: ['0'],
        genero: ['0'],
        evento: ['0'],
        distancia: ['0']
      });
  } 

  ngOnInit(): void {
    this.getSheetData();
  }

  getSheetData() {
    this.categorias.push(this.catalogoDefecto);
    this.generos.push(this.catalogoDefecto);
    this.eventos.push(this.catalogoDefecto);
    this.distancias.push(this.catalogoDefecto);
    //https://drive.google.com/file/d/1aQJ2U7gaMmE4ta16UNJtXXL3EjiG5zMl/view?usp=sharing
    const arrayArchivos = new Array();
    arrayArchivos.push("1yeYyc7yXjgAVXAkKPUAnYzF610HU9TF1p1jkJ1OWvUo");

    for (let idSheet of arrayArchivos) {
      this.googleShteetsService.getSheetData(idSheet)
      .subscribe(response => {      
        this.agregarParticipantes(response);       
      });
    }   
  }

  agregarParticipantes(response: any) {
    for (let iterador of response) {
      const participante: Participante = new Participante();
      participante.lugar = iterador.lugar;
      participante.chip = iterador.chip;
      participante.dorsal = iterador.dorsal;
      participante.nombreParticipante=iterador.nombreparticipante;
      participante.categoria=iterador.categoría;
      participante.genero=iterador.género;
      participante.tiempoOficial=iterador.tiempooficial;
      participante.tiempoChip=iterador.tiempochip;
      participante.pace = iterador.pace;
      participante.status = iterador.status;
      participante.evento = iterador.evento;
      participante.distancia = iterador.distancia;             
      this.listaParticipantes.push(participante);      
      this.agregarCatalogo(this.categorias, iterador.categoría);
      this.agregarCatalogo(this.generos, iterador.género);
      this.agregarCatalogo(this.eventos, iterador.evento);
      this.agregarCatalogo(this.distancias, iterador.distancia);     
    }
    //this.finCargaDatos = true;
    this.respaldoParticipantes = this.listaParticipantes;
  }

  agregarCatalogo(acumuladorCatalogos: CatalogoValor[], nuevoValor: string) {
    if (!this.verifyExisteCatalogoValor(acumuladorCatalogos, nuevoValor)) {
      let nuevoCatalogoValor = new CatalogoValor();
      nuevoCatalogoValor.codigo = acumuladorCatalogos.length + 1;
      nuevoCatalogoValor.valor = nuevoValor;
      acumuladorCatalogos.push(nuevoCatalogoValor);
    }
  }

  verifyExisteCatalogoValor (acumuladorCatalogos: CatalogoValor[], nuevoValor: string) {
    let existe = false;
    if (acumuladorCatalogos && nuevoValor) {
      const catalogo = acumuladorCatalogos.find(iterador => iterador.valor === nuevoValor);
      if (catalogo) {
        existe = true;
      }
    }
    return existe;
  }

  cambiarFiltros() {
    const controlCategoria = this.forma.get('categoria');
    const controlGenero = this.forma.get('genero');
    const controlEvento = this.forma.get('evento');
    const controlDistancia = this.forma.get('distancia');

    const valorCat = controlCategoria.value? parseInt(controlCategoria.value): 0;
    const valorGen = controlGenero.value? parseInt(controlGenero.value): 0;
    const valorEve = controlEvento.value? parseInt(controlEvento.value): 0;
    const valorDis = controlDistancia.value? parseInt(controlDistancia.value): 0;

    const catalogoCat = this.categorias.find(iterador => iterador.codigo === valorCat);
    const catalogoGen = this.generos.find(iterador => iterador.codigo === valorGen);
    const catalogoEve = this.eventos.find(iterador => iterador.codigo === valorEve);
    const catalogoDis = this.distancias.find(iterador => iterador.codigo === valorDis);
    
    const siCat = (catalogoCat && valorCat !== 0);
    const siGen = (catalogoGen && valorGen !== 0);
    const siEve = (catalogoEve && valorEve !== 0);
    const siDis = (catalogoDis && valorDis !== 0);
    
    if (this.respaldoParticipantes && (siCat || siGen || siEve || siDis)) {
      if (siCat) {
        this.listaParticipantes = this.respaldoParticipantes
        .filter(iterador => (iterador.categoria === catalogoCat.valor));
      }
      if (siGen) {
        if (siCat) {
          this.listaParticipantes = this.listaParticipantes
          .filter(iterador => (iterador.genero === catalogoGen.valor));
        } else {
          this.listaParticipantes = this.respaldoParticipantes
          .filter(iterador => (iterador.genero === catalogoGen.valor));
        }  
      }
      if (siEve) {
        if (siCat || siGen) {          
          this.listaParticipantes = this.listaParticipantes
          .filter(iterador => (iterador.evento === catalogoEve.valor));          
        } else {
          this.listaParticipantes = this.respaldoParticipantes
          .filter(iterador => (iterador.evento === catalogoEve.valor));
        }
      }
      if (siDis) {
        if (siCat || siGen || siEve) {
          this.listaParticipantes = this.listaParticipantes
          .filter(iterador => (iterador.distancia === catalogoDis.valor));
        } else {
          this.listaParticipantes = this.respaldoParticipantes
          .filter(iterador => (iterador.distancia === catalogoDis.valor));
        }        
      }
    } else {
      this.listaParticipantes = this.respaldoParticipantes
    }
  }

  verResultado(participante: Participante){
    this.openDialog(participante);
  }

  openDialog(participante: Participante): void {
    const dialogRef = this.dialog.open(ModalDatosParticipanteComponent, {
      width: '700px',
      data: participante
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log("Cerar modal, data: ", result);    
    });
  }


}
