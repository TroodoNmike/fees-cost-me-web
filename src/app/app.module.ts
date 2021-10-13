import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    NgbModalModule,
    NgbPopoverModule,
    NgbToastModule,
    NgbTooltipConfig,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgoPipe } from '../pipes/ago.pipe';
import { CardComponent } from './card/card.component';
import { CardEmptyComponent } from './card-empty/card-empty.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { AddressService } from './services/address.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressShortPipe } from '../pipes/address-short.pipe';
import { OpenAddressInExplorerDirective } from './directives/open-address-in-explorer.directive';
import { ToastComponent } from './toast/toast.component';
import { ProfileEditComponent } from './profile/profile-edit.component';

import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';

@NgModule({
    declarations: [
        AppComponent,
        AgoPipe,
        AddressShortPipe,
        CardComponent,
        CardEmptyComponent,
        CardModalComponent,
        OpenAddressInExplorerDirective,
        ToastComponent,
        ProfileEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        NgbModalModule,
        FormsModule,
        NgbTooltipModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        ClipboardModule,
        NgbPopoverModule,
        NgbToastModule,
    ],
    providers: [
        AddressService,
        NgbTooltipConfig,
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: false,
            }),
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
