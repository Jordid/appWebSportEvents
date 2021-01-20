import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { Funcional } from '@app/_models/funcional';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit {
  user: User;
  funcional: Funcional;
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
      if (this.accountService.userValue) {
        debugger;
        this.user = this.accountService.userValue;
        this.funcional = this.accountService.funcionalValue? this.accountService.funcionalValue: null;
        console.log("Main menu. Esta autenticado..", this.accountService.userValue);
      } else {
        console.log("Main menu. No autenticado..");
        this.router.navigate(['/']);
      }
  }

  verificarSiEstaAutenticado() {
    return this.accountService.verificarSiEstaAutenticado();
  }

  ngOnInit(): void {
  }

  logout() {
    console.log("Salir...");    
    this.accountService.logout();
  }

}
