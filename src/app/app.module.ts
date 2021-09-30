import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgoPipe } from '../pipes/ago.pipe';
import { CardComponent } from './card/card.component';
import { CardEmptyComponent } from './card-empty/card-empty.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { AddressService } from './services/address.service';

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
    ],
    providers: [AddressService],
    bootstrap: [AppComponent],
})
export class AppModule {}
