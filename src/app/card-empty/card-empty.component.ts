import { Component, EventEmitter, Output } from '@angular/core';
import { CardInterface } from '../interfaces/card.interface';

@Component({
    selector: 'app-card-empty',
    templateUrl: './card-empty.component.html',
    styleUrls: ['./card-empty.component.scss'],
})
export class CardEmptyComponent {
    openCard: EventEmitter<CardInterface | undefined> = new EventEmitter();
    @Output() addCard: EventEmitter<CardInterface> = new EventEmitter();

    open() {
        this.openCard.emit(undefined);
    }

    refreshCard(card: CardInterface) {
        this.addCard.emit(card);
    }
}
