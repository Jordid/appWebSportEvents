import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Funcional } from '../_models/funcional';
import { saveAs } from 'file-saver';
@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private funcionalSubject: BehaviorSubject<Funcional>;
    public funcional: Observable<Funcional>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        if (localStorage.getItem('user')) {
            let userFromLocalStorage = localStorage.getItem('user');
            if (userFromLocalStorage && userFromLocalStorage !== "undefined") {
                let userFromLocalStoragParsed = JSON.parse(userFromLocalStorage);
                if (userFromLocalStoragParsed) {
                    this.userSubject = new BehaviorSubject<User>(userFromLocalStoragParsed);
                    this.user = this.userSubject.asObservable();
                }                
            }
        }

        if (localStorage.getItem('funcional')) {
            let funcionalFromLocalStorage = localStorage.getItem('funcional');
            if (funcionalFromLocalStorage && funcionalFromLocalStorage !== "undefined") {
                let funcionalFromLocalStoragParsed = JSON.parse(funcionalFromLocalStorage);
                if (funcionalFromLocalStoragParsed) {
                    this.funcionalSubject = new BehaviorSubject<Funcional>(funcionalFromLocalStoragParsed);
                    this.funcional = this.funcionalSubject.asObservable();
                }                
            }
        }
        //this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        //this.user = this.userSubject.asObservable();

        //this.funcionalSubject = new BehaviorSubject<Funcional>(JSON.parse(localStorage.getItem('funcional')));
        //this.funcional = this.funcionalSubject.asObservable();
    }

    public get userValue(): User {
        if (this.userSubject && this.userSubject.value) {
            return this.userSubject.value;
        }
        return null;        
    }

    public get funcionalValue(): Funcional {
        if (this.funcionalSubject && this.funcionalSubject.value) {
            return this.funcionalSubject.value;
        }
        return null;
    }

    loginAux(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                console.log("Login aux user: ", user);                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    login(jsonToLogin: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/api/user/login`, jsonToLogin).pipe(map(data => {
            if (data) {
                if (data.success) {
                    const dataIn = data.data[0];
                    console.log(dataIn);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes                    
                    localStorage.setItem('user', JSON.stringify(dataIn.usuarios));
                    this.userSubject.next(dataIn.usuarios);
                    localStorage.setItem('funcional', JSON.stringify(dataIn.personas));
                    debugger;
                    this.funcionalSubject.next(dataIn.personas);
                } else {
                    console.log("Error. Algo incorrecto.");                    
                    console.log(data.message);                    
                }
            } else {
                console.log("Error en el login.");                
            }
            return data;
        }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    verificarSiEstaAutenticado() {
        return this.userValue? true: false;
    }

    register(user: any) {
        console.log("user:", user);   
        var url = "http://localhost:3000/api/user/create";
        return this.http.post(url, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

    verCertificado(data: any) {
        //return this.http.post(`${environment.apiUrl}/api/user/generarCertificado`, participante);
        var url = "http://localhost:3000/api/user/generarCertificado";
        var mediaType = 'application/pdf';
        this.http.post(url, data, { responseType: 'blob' }).subscribe(
            (response) => {
                var blob = new Blob([response], { type: mediaType });
                saveAs(blob, 'CertificadoDeParticipacion.pdf');
            },
            e => { new Error(e); }
        );

    }

   

}