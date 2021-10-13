export interface CardInterface {
    id: number;
    address: string;
    name: string;
    blockchain: AvailableBlockchains;
    icon: AvailableCryptoIcons;
    transactions: TransactionInterface[];
    series: any[];
    highest: number;
    lowest: number;
    average5: number;
    average10: number;
    total5: number;
    total10: number;
}

export interface TransactionInterface {
    id: string;
    date: string;
    fee: number;
    feeValue: number;
}

export type AvailableBlockchains = 'ethereum' | 'solana' | 'bitcoin';
export type AvailableCryptoIcons = 'btc' | 'eth' | 'sol';

export class CardEmpty implements CardInterface {
    id = 0;
    address = '';
    name = '';
    blockchain: AvailableBlockchains = 'solana';
    icon: AvailableCryptoIcons = 'sol';
    transactions = [];
    series = [];
    highest = 0;
    lowest = 0;
    average5 = 0;
    average10 = 0;
    total5 = 0;
    total10 = 0;
}
