import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardEmpty, CardInterface } from '../interfaces/card.interface';

@Component({
    selector: 'app-card-empty',
    templateUrl: './card-empty.component.html',
    styleUrls: ['./card-empty.component.scss'],
})
export class CardEmptyComponent {
    openCard: EventEmitter<CardInterface> = new EventEmitter();

    @Input() totalCards = 0;
    @Input() profileName = '';
    @Output() addCard: EventEmitter<CardInterface> = new EventEmitter();

    open() {
        const cardEmpty = new CardEmpty();
        cardEmpty.name = 'Account ' + (this.totalCards + 1);
        this.openCard.emit(cardEmpty);
    }

    refreshCard(card: CardInterface) {
        this.addCard.emit(card);
    }
}
