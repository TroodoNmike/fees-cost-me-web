import { Pipe, PipeTransform } from '@angular/core';

import {
    differenceInHours,
    differenceInMinutes,
    formatDistanceStrict,
    isAfter,
    isValid,
    parseISO,
} from 'date-fns';

@Pipe({
    name: 'ago',
})
export class AgoPipe implements PipeTransform {
    transform(value: string, now = new Date()): string {
        const convertedToDate = parseISO(value);

        if (!isValid(convertedToDate)) {
            return '';
        }

        if (isAfter(convertedToDate, now)) {
            return '';
        }

        if (differenceInMinutes(now, convertedToDate) <= 1) {
            return 'minute ago';
        }

        if (differenceInHours(now, convertedToDate) < 1) {
            return formatDistanceStrict(convertedToDate, now, {
                unit: 'minute',
                addSuffix: true,
                roundingMethod: 'floor',
            });
        }

        if (differenceInHours(now, convertedToDate) < 24) {
            return formatDistanceStrict(convertedToDate, now, {
                unit: 'hour',
                addSuffix: true,
                roundingMethod: 'round',
            });
        }

        if (differenceInHours(now, convertedToDate) >= 24) {
            return formatDistanceStrict(convertedToDate, now, {
                unit: 'day',
                addSuffix: true,
                roundingMethod: 'round',
            });
        }

        // @todo not sure how to test this
        return 'unknown date';
    }
}
