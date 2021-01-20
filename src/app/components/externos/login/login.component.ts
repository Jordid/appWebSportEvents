import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../../services/alert.service';
import { AccountService } from '../../../services/account.service';
import { JsonUtils } from '../../../utils/JsonUtils';

@Component({selector: 'login', templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    login() {
        console.log("Login...");
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.accountService.login(this.buildJsonToLogin(this.f.username.value, this.f.password.value))
        .pipe(first())
        .subscribe(
            data => {
                console.info("Usuario logeado existosamente..", data);
                this.router.navigate(['interno/proximoseventos']);
                this.alertService.success("Inicio de sesión exitoso...");
            },
            error => {
                console.log("Error en login: ", error);              
                this.alertService.error(error);
            });
    }

    buildJsonToLogin (email: string, password: string): any {
        let jsonToLogin = JsonUtils.buildBasicJsonToRequest();
        jsonToLogin.data['email'] = email;
        jsonToLogin.data['password'] = password;
        return jsonToLogin;
    }

    irCrearUsuario() {
      this.router.navigate(['externo/crearusuario']);
    }
  

}