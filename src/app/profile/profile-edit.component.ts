import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {
    ProfileEmpty,
    ProfileInterface,
} from '../interfaces/profile.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {
    @ViewChild('modalContent') template: TemplateRef<any> | undefined;
    @Input() edit: EventEmitter<ProfileInterface> = new EventEmitter();
    @Output() saved: EventEmitter<ProfileInterface> = new EventEmitter();

    modal: NgbModalRef | undefined = undefined;
    profile: ProfileInterface = new ProfileEmpty();
    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {
        this.edit.subscribe((profile) => {
            this.profile = profile;
            this.modal = this.modalService.open(this.template, {
                modalDialogClass: 'app-dialog',
            });
        });
    }

    saveProfile() {
        this.saved.emit(this.profile);
        this.modal?.close(this.profile);
    }
}
