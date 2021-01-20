import { Component, Inject } from '@angular/core';
import { AccountService } from './services/account.service';
import { LoaderService } from './services/loader.service';
import { User } from './_models';

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    // Decorator wires up blockUI instance
    @BlockUI() blockUI: NgBlockUI;
    user: User;

    constructor(
        private loaderService: LoaderService,
        private accountService: AccountService
    ) {
        this.loaderService.isLoading.subscribe((isLoading) => {
            if (isLoading) {
                this.blockUI.start('Loading...');
            } else {
                this.blockUI.stop();
            }
          });

        if (this.accountService.user) {
            this.accountService.user.subscribe(x => this.user = x);
        }
    }

    logout() {
        this.accountService.logout();
    }
}
