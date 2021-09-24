import { Pipe, PipeTransform } from '@angular/core';

import {
    differenceInDays,
    differenceInHours,
    formatDistanceToNowStrict,
    parseISO,
} from 'date-fns';

@Pipe({
    name: 'ago',
})
export class AgoPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): unknown {
        const convertedToDate = parseISO(value);

        const now = new Date();
        const days = differenceInDays(now, convertedToDate);

        if (days <= 1) {
            const hours = differenceInHours(now, convertedToDate, {
                roundingMethod: 'floor',
            });

            console.log(hours);
            if (hours <= 1) {
                return formatDistanceToNowStrict(convertedToDate, {
                    unit: 'minute',
                    addSuffix: false,
                });
            }

            // add minutes here as well not just hours
            return formatDistanceToNowStrict(convertedToDate, {
                unit: 'hour',
                addSuffix: false,
                roundingMethod: 'floor',
            });
        }

        return formatDistanceToNowStrict(convertedToDate, {
            unit: 'day',
            addSuffix: true,
            roundingMethod: 'floor',
        });
    }
}
