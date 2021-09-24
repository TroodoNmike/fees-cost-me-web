import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardInterface } from '../interfaces/card.interface';
import detectEthereumProvider from '@metamask/detect-provider';

declare var window: any;

@Component({
    selector: 'app-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
    @ViewChild('content') test: TemplateRef<any> | undefined;
    @Input() openCard: EventEmitter<CardInterface | undefined> =
        new EventEmitter();
    @Output() removeCard: EventEmitter<undefined> = new EventEmitter();
    @Output() select: EventEmitter<CardInterface> = new EventEmitter();

    modal: NgbModalRef | undefined = undefined;
    card: CardInterface | undefined = undefined;

    address = '';
    blockchain: 'ethereum' | 'solana' | 'bitcoin' = 'solana';
    icon: 'btc' | 'eth' | 'sol' = 'sol';

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {
        this.openCard.subscribe((data) => {
            this.card = data;
            if (this.test) {
                this.open(this.test);
            }
        });

        this.goPhantom();
    }
    open(content: TemplateRef<any>) {
        this.modal = this.modalService.open(content, {
            modalDialogClass: 'app-dialog',
        });
    }

    selectAddress() {
        this.card = {
            address: this.address,
            blockchain: this.blockchain,
            icon: this.icon,
            transactions: [],
            total1: 0,
            total5: 0,
            total10: 0,
        };
        this.select.emit(this.card);

        this.modal?.close({
            address: this.address,
            blockchain: this.blockchain,
        });
    }

    phantom() {
        const isPhantomInstalled = window.solana && window.solana.isPhantom;

        if (isPhantomInstalled) {
            window.solana.connect();
        }
    }

    remove() {
        if (this.modal) {
            this.modal.result.then(() => {
                this.card = undefined;
                this.removeCard.emit();
            });
            this.modal.close();
        }
    }
    async goPhantom() {
        const isPhantomInstalled =
            (await window.solana) && (await window.solana.isPhantom);
        if (isPhantomInstalled) {
            window.solana.on('connect', () => {
                this.address = window.solana.publicKey.toString();
                this.blockchain = 'solana';
                this.icon = 'sol';
            });
        }
    }

    async metamask() {
        const isInstalled = window.ethereum && window.ethereum.isMetaMask;

        const provider = await detectEthereumProvider();

        if (isInstalled) {
            if (provider) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                if (accounts.length > 0) {
                    this.address = accounts[0];
                    this.blockchain = 'ethereum';
                    this.icon = 'eth';
                }
            } else {
                console.log('Please install MetaMask!');
            }
        }
    }
}
