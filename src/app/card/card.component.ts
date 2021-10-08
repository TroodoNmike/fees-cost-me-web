import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
    CardEmpty,
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
    @Input() card: CardInterface = new CardEmpty();
    openCard: EventEmitter<CardInterface> = new EventEmitter();

    page = 1;
    perPage = 10;
    totalPages = 0;

    loading = true;
    message = '';

    multi: any[] = [];
    view: any = [200, 40];

    // options
    legend: boolean = false;
    showLabels: boolean = false;
    animations: boolean = false;
    xAxis: boolean = false;
    yAxis: boolean = false;
    timeline: boolean = false;

    scale = [
        {
            min: 0,
            max: 40,
        },
        {
            min: 0,
            max: 30,
        },
        {
            min: 0,
            max: 0.005,
        },
    ];

    public colorScheme: any = {
        domain: ['#3f51b5'], // fixed for now
    };

    constructor(private addressService: AddressService) {}

    ngOnInit(): void {
        if (this.card) {
            this.getCardData(this.card);
        }
    }

    open() {
        const copy = Object.assign({}, this.card);
        this.openCard.emit(copy);
    }

    public removeCard() {
        // this.card = undefined;
    }

    refresh($event: MouseEvent) {
        this.getCardData(this.card, true);
        $event.stopPropagation();
    }

    refreshCard(card: CardInterface) {
        // this.page = 1;
        // this.loading = true;
        // this.addressService.getTransactionsForCard(card).subscribe((card) => {
        //     this.card = card;
        // });
        this.card = card;
        this.getCardData(card);
    }

    openTransaction($event: MouseEvent, transaction: TransactionInterface) {
        let destination = '';
        if (this.card?.blockchain == 'bitcoin') {
            destination = `https://www.blockchain.com/btc/tx/${transaction.id}`;
        } else if (this.card?.blockchain == 'ethereum') {
            destination = `https://etherscan.io/tx/${transaction.id}`;
        } else if (this.card?.blockchain == 'solana') {
            destination = `https://explorer.solana.com/tx/${transaction.id}`;
        }

        window.open(destination, '_blank');
        $event.stopPropagation();
    }

    nextPage($event: MouseEvent) {
        ++this.page;
        $event.stopPropagation();
    }

    getStart() {
        return (this.page - 1) * this.perPage;
    }

    getEnd() {
        return (this.page - 1) * this.perPage + this.perPage;
    }

    previousPage($event: MouseEvent) {
        --this.page;
        $event.stopPropagation();
    }

    private getCardData(card: CardInterface, refresh = false) {
        this.page = 1;
        this.totalPages = 0;
        this.loading = true;

        this.addressService
            .getTransactionsForCard(card, refresh)
            .pipe(
                delay(500),
                finalize(() => (this.loading = false)),
                catchError((error) => {
                    this.message = 'Could not load / find transactions';
                    return of(undefined);
                })
            )
            .subscribe((card) => {
                if (card) {
                    this.card = card;
                    if (this.card) {
                        this.totalPages = Math.ceil(
                            this.card.transactions.length / this.perPage
                        );
                    }

                    // @todo to be removed
                    // if (this.card && this.card.id === 0) {
                    //     setTimeout(() => this.open());
                    // }
                }
            });
    }
}
