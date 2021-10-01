import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    NgbModalModule,
    NgbTooltipConfig,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgoPipe } from '../pipes/ago.pipe';
import { CardComponent } from './card/card.component';
import { CardEmptyComponent } from './card-empty/card-empty.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { AddressService } from './services/address.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        AgoPipe,
        CardComponent,
        CardEmptyComponent,
        CardModalComponent,
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
    ],
    providers: [AddressService, NgbTooltipConfig],
    bootstrap: [AppComponent],
})
export class AppModule {}
