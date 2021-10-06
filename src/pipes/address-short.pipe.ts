import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addressShort',
})
export class AddressShortPipe implements PipeTransform {
    transform(value: string): string {
        let item = '';

        if (value && value.length >= 10) {
            return value.substr(0, 4) + '...' + value.substr(-4);
        }

        return value;
    }
}
