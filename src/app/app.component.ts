import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { CardInterface } from './interfaces/card.interface';
import { ProfileInterface } from './interfaces/profile.interface';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { defaultProfile } from './app.data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    editProfile: EventEmitter<ProfileInterface> = new EventEmitter();
    profiles: ProfileInterface[] = [defaultProfile];
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
        const emptyProfiles = this.profiles.filter(
            (profile) => profile.cards.length === 0
        );

        this.profiles.push({
            name: `Profile ${this.profiles.length}`,
            cards: [],
        });
        this.selectedProfile = this.profiles[this.profiles.length - 1];
    }

    addCard(card: CardInterface) {
        this.selectedProfile.cards.push(card);
    }

    selectProfile(profile: ProfileInterface) {
        this.selectedProfile = profile;
    }

    removeProfile() {
        const confirm = prompt('sure?');

        if (confirm) {
            // to prevent dropdown being stuck on the screen
            setTimeout(() => {
                if (this.selectedProfile != this.profiles[0]) {
                    this.profiles = this.profiles.filter(
                        (t) => t !== this.selectedProfile
                    );
                    this.selectedProfile = this.profiles[0];
                }
            });
        }
    }

    editProfileOpen(profile: ProfileInterface) {
        const editCopy = Object.assign({}, profile);
        this.editProfile.emit(editCopy);
    }

    saved($event: ProfileInterface) {
        const index = this.profiles.findIndex(
            (profile) => profile == this.selectedProfile
        );
        this.profiles[index] = $event;
        this.selectedProfile = $event;
    }
}
