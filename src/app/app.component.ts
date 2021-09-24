import { Component } from '@angular/core';
import { CardInterface } from './interfaces/card.interface';
import { ProfileInterface } from './interfaces/profile.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    profiles: ProfileInterface[] = [
        {
            name: 'Default Set',
            cards: [
                {
                    address: '1EY2jSam6Q5Kp7D1sbBMhvX8z74Qmkkeuc',
                    blockchain: 'bitcoin',
                    icon: 'btc',
                    transactions: [],
                    total1: 0,
                    total5: 0,
                    total10: 0,
                },
                {
                    address: '0xe055248df087faba7758055cbdf6aa9acf246627',
                    blockchain: 'ethereum',
                    icon: 'eth',
                    transactions: [],
                    total1: 0,
                    total5: 0,
                    total10: 0,
                },
                // {
                //     address: '14Fyz7dpFrJnibbq2296vihzdFBgrsikxE4kERKKk3HG',
                //     blockchain: 'solana',
                //     icon: 'sol',
                //     transactions: [],
                //     total1: 0,
                //     total5: 0,
                //     total10: 0,
                // },
                {
                    address: '9K8QMqQkuCxUFHFh2JogHNEtXSestisnXNdzDwPeDECU',
                    blockchain: 'solana',
                    icon: 'sol',
                    transactions: [],
                    total1: 0,
                    total5: 0,
                    total10: 0,
                },
            ],
        },
    ];
    selectedProfile: ProfileInterface = this.profiles[0];

    constructor() {
        // let localCards = localStorage.getItem('cards');
        // if (localCards) {
        //     this.cards = JSON.parse(localCards);
        // }
    }

    addProfile() {
        this.profiles.push({ name: 'New Profile', cards: [] });
        this.selectedProfile = this.profiles[this.profiles.length - 1];
    }

    addCard(card: CardInterface) {
        this.selectedProfile.cards.push(card);
    }

    selectProfile(profile: ProfileInterface) {
        this.selectedProfile = profile;
    }
}
