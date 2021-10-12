import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    host: { class: 'app-toast-container' },
})
export class ToastComponent {
    constructor(public toastService: ToastService) {}

    close(toast: any) {
        this.toastService.remove(toast);
    }
}
