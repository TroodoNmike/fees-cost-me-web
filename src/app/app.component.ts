import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { CardInterface } from './interfaces/card.interface';
import { ProfileInterface } from './interfaces/profile.interface';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { defaultProfile } from './app.data';
import { ProfileService } from './services/profile.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    editProfile: EventEmitter<ProfileInterface> = new EventEmitter();
    profiles: ProfileInterface[] = [defaultProfile];
    selectedProfile: ProfileInterface = this.profiles[0];

    constructor(
        private tooltipConfig: NgbTooltipConfig,
        private profileService: ProfileService
    ) {
        tooltipConfig.tooltipClass = 'app-tooltip';

        if (this.profileService.isDataSaved()) {
            this.profiles = this.profileService.getProfiles();
            this.selectedProfile = this.profileService.getSelectedProfile(
                this.profiles
            );
        }
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

        this.saveProfiles();
    }

    addCard(card: CardInterface) {
        this.selectedProfile.cards.push(card);
        this.saveProfiles();
    }

    selectProfile(profile: ProfileInterface) {
        this.selectedProfile = profile;
        this.profileService.saveProfiles(this.profiles, this.selectedProfile);
    }

    deleted($profile: ProfileInterface) {
        if (this.selectedProfile.cards.length > 0) {
            const confirmMsg = confirm(
                'This will remove your saved accounts in selected profile. Are you sure?'
            );

            if (confirmMsg) {
                this.deleteSelectedProfile();
            }
        } else {
            this.deleteSelectedProfile();
        }

        this.saveProfiles();
    }

    editProfileOpen(profile: ProfileInterface) {
        const editCopy = Object.assign({}, profile);
        this.editProfile.emit(editCopy);
    }

    saved(profile: ProfileInterface) {
        const index = this.profiles.findIndex(
            (profile) => profile == this.selectedProfile
        );
        this.profiles[index] = profile;
        this.selectedProfile = profile;
        this.saveProfiles();
    }

    private deleteSelectedProfile() {
        if (this.selectedProfile != this.profiles[0]) {
            this.profiles = this.profiles.filter(
                (t) => t !== this.selectedProfile
            );
            this.selectedProfile = this.profiles[0];
        }
    }

    saveProfiles() {
        this.profileService.saveProfiles(this.profiles, this.selectedProfile);
    }

    removeCard(cards: CardInterface[], index: number) {
        cards.splice(index, 1);
    }
}
