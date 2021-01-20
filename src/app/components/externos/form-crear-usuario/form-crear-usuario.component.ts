import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../../services/alert.service';
import { AccountService } from '../../../services/account.service';
import { ValidacionesFormsService } from '../../../services/validaciones-forms.service';

import { JsonUtils } from '../../../utils/JsonUtils';
import { CatalogoValor } from '@app/models/CatalogoValor';

@Component({
  selector: 'app-form-crear-usuario',
  templateUrl: './form-crear-usuario.component.html',
  styleUrls: ['./form-crear-usuario.component.less']
})
export class FormCrearUsuarioComponent implements OnInit {
  forma: FormGroup;
  fieldTextType: boolean;
  tipoDeInputPassword: boolean;
  tipoDeInputPassword2: boolean;
  tiposUsuario: CatalogoValor[] = new Array();;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService,
      private validacionesFormsService: ValidacionesFormsService,
  ) {
    this.agregarCatalogosTipoUsuario();
  }

  ngOnInit() {
    
      this.forma = this.formBuilder.group({
          primerNombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.validacionesFormsService.getPatternSoloLettersSinTildes())]],
          segundoNombre: [''],
          primerApellido: ['', [Validators.required, Validators.minLength(3)]],
          segundoApellido: ['',],
          email: ['', [  Validators.required, 
                         Validators.pattern(this.validacionesFormsService.getPatternEmailValido())]],

          password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.validacionesFormsService.getPatternSoloNumerosLetrasPunto())]],
          password2: ['', [Validators.required, Validators.minLength(8)]],
          tipo: ['0', [Validators.required]]
      },{
        validators: this.validacionesFormsService.passwordsIguales('password','password2')
      });

  }

  agregarCatalogosTipoUsuario() {
    let cat1 = new CatalogoValor();
    cat1.codigo = 0;
    cat1.valor = "Seleccione";
    let cat2 = new CatalogoValor();
    cat2.codigo = 4;
    cat2.valor = "Competidor";
    let cat3 = new CatalogoValor();
    cat3.codigo = 5;
    cat3.valor = "Organizador";
    this.tiposUsuario.push(cat1);
    this.tiposUsuario.push(cat2);
    this.tiposUsuario.push(cat3);
    console.log("this.tiposUsuario: ", this.tiposUsuario);
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.forma.controls; }

  registrarUsuario() {
    if (this.forma.valid) {
        console.log("Registrar usuario: ", this.forma.value);
        this.alertService.clear();

        this.accountService.register(this.buildJsonToCreateUser(this.forma.value))
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                console.log("Exito...");                
                this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error => {
                this.alertService.error(error);
            });
    } else {
        this.validacionesFormsService.markAsTouched(this.forma);    
        console.log("Formulario invalido");
    }     
  }

  buildJsonToCreateUser (value: any): any {
    let jsonToLogin = JsonUtils.buildBasicJsonToRequest();
    jsonToLogin.data['usuario'] = value;
    return jsonToLogin;
  }

  /* Valdiaciones */
  invalido(nombreControl: string) {
    return this.forma.get(nombreControl).invalid && this.forma.get(nombreControl).touched;
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  
  incompleto(nombreControl: string) {
    return this.forma.get(nombreControl).touched && this.forma.get(nombreControl).errors && this.forma.get(nombreControl).errors.required;
  }

  comboIncompleto(nombreControl: string, valorDefecto: string) {
    return this.forma.get(nombreControl).touched && this.forma.get(nombreControl).value === valorDefecto;
  }

  minLength(nombreControl: string) {
    return this.forma.get(nombreControl).touched && this.forma.get(nombreControl).errors && this.forma.get(nombreControl).errors.minlength;
  }

  patternSoloLetrasSinTildes(nombreControl: string) {
    let control = this.forma.get(nombreControl);
    return control.touched && control.errors && control.errors.pattern;
  }

  inputTextContieneDatos(nombreControl: string) {  
    return this.forma.get(nombreControl) && this.forma.get(nombreControl).value.length > 0 ;
  }

  segundoNombreNoValido(nombreControl: string) {
    let control = this.forma.get(nombreControl);
    let contieneDatos = this.inputTextContieneDatos(nombreControl);
    if (contieneDatos) {
      control.setValidators([Validators.required, Validators.minLength(3), Validators.pattern(this.validacionesFormsService.getPatternSoloLettersSinTildes())]);
    } else {    
      control.setValidators([]); 
    }
    control.updateValueAndValidity();
    return  control.touched && control.invalid;
  }

  segundoApellidoNoValido(nombreControl: string) {
    let control = this.forma.get(nombreControl);
    let contieneDatos = this.inputTextContieneDatos(nombreControl);
    if (contieneDatos) {
      control.setValidators([Validators.required, Validators.minLength(3), Validators.pattern(this.validacionesFormsService.getPatternSoloLettersSinTildes())]);
    } else {    
      control.setValidators([]); 
    }
    control.updateValueAndValidity();
    return  control.touched && control.invalid;
  }

  passwordAndPassword2NoIguales() {
    if (!this.forma.get('password').touched) {
      return false;
    }
    const valuePassword = this.forma.get('password').value;
    const valuePassword2 = this.forma.get('password2').value;
    return (valuePassword === valuePassword2)? false: true; 
  }

  patternSoloNumerosLetrasPunto(nombreControl: string) {
    let control = this.forma.get(nombreControl);
    return control.touched && control.errors && control.errors.pattern;
  }

  mostrarOcultarPassword() {
    this.tipoDeInputPassword = !this.tipoDeInputPassword;  
  }

  mostrarOcultarPassword2() {
    this.tipoDeInputPassword2 = !this.tipoDeInputPassword2;
  }


}
