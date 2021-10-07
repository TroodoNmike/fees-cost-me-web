import { Directive, HostListener, Input } from '@angular/core';
import { AvailableBlockchains } from '../interfaces/card.interface';

@Directive({
    selector: '[appOpenAddressInExplorer]',
})
export class OpenAddressInExplorerDirective {
    @Input() appOpenAddressInExplorer:
        | {
              address: string;
              blockchain: AvailableBlockchains;
          }
        | undefined = undefined;
    @HostListener('click') onClick() {
        if (this.appOpenAddressInExplorer) {
            let destination = '';
            if (this.appOpenAddressInExplorer.blockchain == 'bitcoin') {
                destination = `https://www.blockchain.com/btc/address/${this.appOpenAddressInExplorer.address}`;
            } else if (this.appOpenAddressInExplorer.blockchain == 'ethereum') {
                destination = `https://etherscan.io/address/${this.appOpenAddressInExplorer.address}`;
            } else if (this.appOpenAddressInExplorer.blockchain == 'solana') {
                destination = `https://explorer.solana.com/address/${this.appOpenAddressInExplorer.address}`;
            }

            window.open(destination, '_blank');
        }
    }
}
