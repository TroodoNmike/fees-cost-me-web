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

declare var window: any;
declare var $: any;
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

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {
        this.openCard.subscribe((data) => {
            this.editMode = false;
            this.card = data;
            if (this.contentTemplate) {
                this.open(this.contentTemplate);
            }
        });

        this.goPhantom();
        this.goLiquality();
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

    phantom() {
        const isPhantomInstalled = window.solana && window.solana.isPhantom;

        if (isPhantomInstalled) {
            window.solana.connect();
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
    async goPhantom() {
        const isPhantomInstalled =
            (await window.solana) && (await window.solana.isPhantom);
        if (isPhantomInstalled) {
            window.solana.on('connect', () => {
                this.card.address = window.solana.publicKey.toString();
                this.card.blockchain = 'solana';
                this.card.icon = 'sol';
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
                    this.card.address = accounts[0];
                    this.card.blockchain = 'ethereum';
                    this.card.icon = 'eth';
                    this.editMode = true;
                }
            } else {
                console.log('Please install MetaMask!');
            }
        }
    }

    async liquality() {
        console.log('li');

        try {
            const what = await window.bitcoin.enable();
            if (what) {
                console.log(what);
                console.log('address', what[0]['address']);

                this.card.address = what[0]['address'];
                this.card.blockchain = 'bitcoin';
                this.card.icon = 'btc';
                // const result = await window.bitcoin.request({
                //     method: 'wallet_getAddresses',
                //     params: [0, 10],
                // });

                // console.log(result);
            }
        } catch (exception) {
            console.log('exception', exception);
            $('.toast').toast('show');
        }
    }

    async goLiquality() {
        // const what = await window.bitcoin.enable();
        // if (what) {
        //     console.log(what);
        //
        //     const result = await window.bitcoin.request({
        //         method: 'wallet_getAddresses',
        //         params: [0, 10],
        //     });
        //     console.log(result);
        // }
    }

    example(
        number: number,
        name: string,
        blockchain: AvailableBlockchains,
        icon: AvailableCryptoIcons
    ) {
        this.card.address = this.examples[blockchain][number];
        this.card.blockchain = blockchain;
        this.card.icon = icon;
        this.card.name = name;
        this.editMode = true;
    }

    copy() {
        $('.toast-copied').toast('show');
    }

    copyToClipboard(t: NgbTooltip) {
        t.open();
        setTimeout(() => t.close(), 1500);
    }

    isNew() {
        return this.card.address === '';
    }
}
