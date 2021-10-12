import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
    AvailableBlockchains,
    AvailableCryptoIcons,
    CardEmpty,
    CardInterface,
} from '../interfaces/card.interface';
import detectEthereumProvider from '@metamask/detect-provider';
import { ToastService } from '../services/toast.service';
import * as Sentry from '@sentry/angular';

declare var window: any;
declare var gtag: any;

@Component({
    selector: 'app-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
    @ViewChild('content') contentTemplate: TemplateRef<any> | undefined;
    @Input() openCard: EventEmitter<CardInterface> = new EventEmitter();
    @Output() removeCard: EventEmitter<undefined> = new EventEmitter();
    @Output() select: EventEmitter<CardInterface> = new EventEmitter();

    modal: NgbModalRef | undefined = undefined;
    card: CardInterface = new CardEmpty();

    examples: { [key: string]: string[] } = {
        bitcoin: [
            '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
            '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
            '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
        ],
        ethereum: [
            '0x71c7656ec7ab88b098defb751b7401b5f6d8976f',
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
            '0x9a1c3736778db80224ac7f56c9893804d8fa6bed',
        ],
        solana: [
            'CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq', // many recent transactions, not sure if good example
            '3yFwqXBfZY4jBVUafQ1YEXw189y2dN3V5KQq9uzBDy1E', // top SOL address
            '8PjJTv657aeN9p5R2WoM6pPSz385chvTTytUWaEjSjkq',
        ],
    };
    editMode = false;

    constructor(
        private modalService: NgbModal,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.openCard.subscribe((data) => {
            this.editMode = false;
            this.card = data;
            if (this.contentTemplate) {
                this.open(this.contentTemplate);
            }
        });
    }
    open(content: TemplateRef<any>) {
        this.modal = this.modalService.open(content, {
            modalDialogClass: 'app-dialog',
            size: 'lg',
        });
    }

    selectAddress() {
        const newCard = new CardEmpty();
        newCard.address = this.card.address;
        newCard.blockchain = this.card.blockchain;
        newCard.icon = this.card.icon;
        newCard.name = this.card.name;

        this.select.emit(newCard);
        this.modal?.close({
            address: this.card.address,
            blockchain: this.card.blockchain,
        });
    }

    async phantom() {
        const isPhantomInstalled = window.solana && window.solana.isPhantom;
        if (isPhantomInstalled) {
            try {
                const resp = await window.solana.connect();
                const pubKey = resp.publicKey.toString();
                this.editAndSelect(pubKey, 'solana', 'sol');
            } catch (exception) {
                this.toastService.showDanger('Could not connect');
                Sentry.captureException(exception);
            }
        } else {
            const message = 'Could not connect with Phantom';
            this.toastService.showDanger(message);
            gtag('event', 'Phantom', { installed: false });
        }
    }

    remove() {
        if (this.modal) {
            this.modal.result.then(() => {
                this.card = new CardEmpty();
                this.removeCard.emit();
            });
            this.modal.close();
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

                // @todo what happens if there are more than 1 account giving access
                if (accounts.length > 0) {
                    this.editAndSelect(accounts[0], 'ethereum', 'eth');
                }
            } else {
                this.toastService.showDanger('Please install MetaMask');
            }
        } else {
            const message = 'Could not connect with MetaMask';
            this.toastService.showDanger(message);
            gtag('event', 'Metamask', { installed: false });
        }
    }

    async liquality() {
        const isBitcoinEnabled = window.bitcoin;
        if (isBitcoinEnabled) {
            try {
                const bitcoin = await window.bitcoin.enable();
                if (bitcoin) {
                    this.editAndSelect(bitcoin[0]['address'], 'bitcoin', 'btc');
                }
            } catch (exception) {
                this.toastService.show('Could not connect', { type: 'danger' });
                Sentry.captureException(exception);
            }
        } else {
            this.toastService.show('Could not connect', { type: 'danger' });
            gtag('event', 'Bitcoin', { installed: false });
        }
    }

    async goLiquality() {
        const liquality = await window.bitcoin.enable();
        if (liquality) {
            const result = await window.bitcoin.request({
                method: 'wallet_getAddresses',
                params: [0, 10],
            });
        }
    }

    example(
        number: number,
        name: string,
        blockchain: AvailableBlockchains,
        icon: AvailableCryptoIcons
    ) {
        this.card.name = name;
        this.editAndSelect(this.examples[blockchain][number], blockchain, icon);
    }

    copyToClipboard(t: NgbTooltip) {
        t.open();
        setTimeout(() => t.close(), 1500);
    }

    isNew() {
        return this.card.address === '';
    }

    private editAndSelect(
        address: string,
        blockChain: AvailableBlockchains,
        icon: AvailableCryptoIcons
    ) {
        this.card.address = address;
        this.card.blockchain = blockChain;
        this.card.icon = icon;
        this.selectAddress();
    }
}
