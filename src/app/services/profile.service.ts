import { Injectable } from '@angular/core';
import { ProfileInterface } from '../interfaces/profile.interface';

const PROFILES = 'profiles';
const SELECTED_PROFILE_INDEX = 'selectedProfileIndex';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    saveProfiles(
        profiles: ProfileInterface[],
        selectedProfile: ProfileInterface
    ) {
        localStorage.setItem(PROFILES, JSON.stringify(profiles));
        localStorage.setItem(
            SELECTED_PROFILE_INDEX,
            JSON.stringify(
                this.getSelectedProfileIndex(profiles, selectedProfile)
            )
        );
    }

    private getSelectedProfileIndex(
        profiles: ProfileInterface[],
        selectedProfile: ProfileInterface
    ): number {
        return profiles.findIndex((profile) => profile == selectedProfile);
    }

    isDataSaved() {
        let db = localStorage.getItem(PROFILES);
        let selectedProfile = localStorage.getItem(SELECTED_PROFILE_INDEX);

        return db && selectedProfile;
    }

    getProfiles(): ProfileInterface[] {
        const profilesRaw = localStorage.getItem(PROFILES);
        if (profilesRaw) {
            return JSON.parse(profilesRaw);
        }
        return [];
    }

    getSelectedProfile(profiles: ProfileInterface[]): ProfileInterface {
        const selectedIndexRaw = localStorage.getItem(SELECTED_PROFILE_INDEX);
        if (selectedIndexRaw) {
            return profiles[JSON.parse(selectedIndexRaw)];
        }

        return profiles[0];
    }
}
