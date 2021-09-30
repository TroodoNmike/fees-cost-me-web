import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    CardInterface,
    TransactionInterface,
} from '../interfaces/card.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class AddressService {
    constructor(private client: HttpClient) {}

    public getTransactionsForCard(card: CardInterface) {
        return this.client
            .get<{ data: TransactionInterface[] }>(
                `http://localhost:3000/blockchain/${card.blockchain}/${card.address}`
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

                    card.total1 = total1;
                    card.total5 = total5;
                    card.total10 = total10;
                    card.highest = highest;
                    card.lowest = lowest;
                    card.transactions = data.data;
                    return card;
                })
            );
    }
}
