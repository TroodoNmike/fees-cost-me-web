import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
    CardInterface,
    TransactionInterface,
} from '../interfaces/card.interface';
import { catchError, delay, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddressService } from '../services/address.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() card: CardInterface | undefined = undefined;
    openCard: EventEmitter<CardInterface | undefined> = new EventEmitter();

    loading = true;
    message = '';

    constructor(private addressService: AddressService) {}

    ngOnInit(): void {
        if (this.card) {
            this.addressService
                .getTransactionsForCard(this.card)
                .pipe(
                    delay(500),
                    finalize(() => (this.loading = false)),
                    catchError((error) => {
                        this.message = 'Could not load / find transactions';
                        return of(undefined);
                    })
                )
                .subscribe((card) => {
                    this.card = card || undefined;
                });
        }
    }

    open() {
        this.openCard.emit(this.card);
    }

    public removeCard() {
        this.card = undefined;
    }

    refresh($event: MouseEvent) {
        $event.stopPropagation();
    }

    refreshCard(card: CardInterface) {
        this.addressService.getTransactionsForCard(card).subscribe((card) => {
            this.card = card;
        });
    }

    openTransaction($event: MouseEvent, transaction: TransactionInterface) {
        window.open('https://google.com', '_blank');
        $event.stopPropagation();
    }
}
