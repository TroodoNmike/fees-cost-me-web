import { Component } from '@angular/core';
import { CardInterface } from './interfaces/card.interface';
import { ProfileInterface } from './interfaces/profile.interface';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

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
                    id: 0,
                    address: '1EY2jSam6Q5Kp7D1sbBMhvX8z74Qmkkeuc',
                    name: 'Account 1',
                    blockchain: 'bitcoin',
                    icon: 'btc',
                    transactions: [],
                    series: [],
                    total1: 0,
                    total5: 0,
                    total10: 0,
                    highest: 0,
                    lowest: 0,
                },
                {
                    id: 1,
                    address: '0xe055248df087faba7758055cbdf6aa9acf246627',
                    name: 'Account 2',
                    blockchain: 'ethereum',
                    icon: 'eth',
                    transactions: [],
                    series: [],
                    total1: 0,
                    total5: 0,
                    total10: 0,
                    highest: 0,
                    lowest: 0,
                },
                {
                    id: 2,
                    address: '9K8QMqQkuCxUFHFh2JogHNEtXSestisnXNdzDwPeDECU',
                    name: 'Account 3',
                    blockchain: 'solana',
                    icon: 'sol',
                    transactions: [],
                    series: [],
                    total1: 0,
                    total5: 0,
                    total10: 0,
                    highest: 0,
                    lowest: 0,
                },
            ],
        },
    ];
    selectedProfile: ProfileInterface = this.profiles[0];

    constructor(private tooltipConfig: NgbTooltipConfig) {
        this.addProfile();
        tooltipConfig.tooltipClass = 'app-tooltip';
        // let localCards = localStorage.getItem('cards');
        // if (localCards) {
        //     this.cards = JSON.parse(localCards);
        // }
    }

    addProfile() {
        const name = 'Profile ' + this.profiles.length;
        this.profiles.push({ name: name, cards: [] });
        this.selectedProfile = this.profiles[this.profiles.length - 1];
    }

    addCard(card: CardInterface) {
        this.selectedProfile.cards.push(card);
    }

    selectProfile(profile: ProfileInterface) {
        this.selectedProfile = profile;
    }

    removeProfile() {
        if (this.selectedProfile != this.profiles[0]) {
            this.profiles = this.profiles.filter(
                (t) => t !== this.selectedProfile
            );
            this.selectedProfile = this.profiles[0];
        }
    }
}
