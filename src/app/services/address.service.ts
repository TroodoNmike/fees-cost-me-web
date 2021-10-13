import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    CardInterface,
    TransactionInterface,
} from '../interfaces/card.interface';
import { map } from 'rxjs/operators';
import { format, parseISO } from 'date-fns';
import { environment } from '../../environments/environment';

@Injectable()
export class AddressService {
    constructor(private client: HttpClient) {}

    public getTransactionsForCard(card: CardInterface, refresh = false) {
        const host = environment.production ? '' : 'http://localhost:3000';
        return this.client
            .get<{ data: TransactionInterface[] }>(
                `${host}/blockchain/${card.blockchain}/${card.address}${
                    refresh ? `?refresh=true` : ''
                }`
            )
            .pipe(
                map((data): CardInterface => {
                    let total1 = 0;
                    let total5 = 0;
                    let total10 = 0;
                    let highest = 0;
                    let lowest = 0;

                    data.data.forEach((item: TransactionInterface, index) => {
                        if (index === 0) {
                            total1 = item.feeValue;
                        }
                        if (index < 5) {
                            total5 += item.feeValue;
                        }

                        if (index < 10) {
                            total10 += item.feeValue;
                        }
                        if (item.feeValue > highest) {
                            highest = item.feeValue;
                        }
                        if (lowest === 0 || item.feeValue < lowest) {
                            lowest = item.feeValue;
                        }
                    });

                    if (data.data.length > 0) {
                        card.average5 =
                            total5 /
                            (data.data.length < 5 ? data.data.length : 5);
                        card.average10 =
                            total10 /
                            (data.data.length < 10 ? data.data.length : 10);
                    }
                    card.total5 = total5;
                    card.total10 = total10;
                    card.highest = highest;
                    card.lowest = lowest;
                    card.transactions = data.data;
                    card.series = this.getSeries(data.data);
                    return card;
                })
            );
    }

    private getSeries(data: TransactionInterface[]) {
        const items: { name: any; value: any }[] = [];

        data.forEach((item) => {
            items.push({
                name: format(parseISO(item.date), 'Pp'),
                value: item.feeValue,
            });
        });

        return items;
    }
}
