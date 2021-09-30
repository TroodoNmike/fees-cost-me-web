export interface CardInterface {
    address: string;
    blockchain: 'ethereum' | 'solana' | 'bitcoin';
    icon: 'btc' | 'eth' | 'sol';
    transactions: TransactionInterface[];
    highest: number;
    lowest: number;
    total1: number;
    total5: number;
    total10: number;
}

export interface TransactionInterface {
    id: string;
    date: string;
    fee: number;
    feeValue: number;
}
