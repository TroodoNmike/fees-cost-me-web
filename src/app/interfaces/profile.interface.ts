import { CardInterface } from './card.interface';

export interface ProfileInterface {
    name: string;
    cards: CardInterface[];
}

export class ProfileEmpty implements ProfileInterface {
    name = '';
    cards = [];
}
