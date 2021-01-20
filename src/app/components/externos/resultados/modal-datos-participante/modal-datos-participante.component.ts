import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Participante } from '@app/models/Participante';
import { AccountService } from '@app/services/account.service';

data: Participante;

@Component({
  selector: 'app-modal-datos-participante',
  templateUrl: './modal-datos-participante.component.html',
  styleUrls: ['./modal-datos-participante.component.less']
})
export class ModalDatosParticipanteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDatosParticipanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participante,
    private accountService: AccountService) {      
  }

  ngOnInit() {
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  descargarCertificado() {
    console.log("Get certificado.");
    const dataSend = {
      data: {
        datosParticipante: this.data
      }     
    }  
    this.accountService.verCertificado(dataSend);     
  }

  
}
