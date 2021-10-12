import { AgoPipe } from './ago.pipe';
import { parseISO } from 'date-fns';

fdescribe('AgoPipe', () => {
    it('create an instance', () => {
        const pipe = new AgoPipe();
        expect(pipe).toBeTruthy();
    });

    it('should check simple value', () => {
        const pipe = new AgoPipe();
        expect(pipe.transform('')).toBe('');
        expect(pipe.transform('123')).toBe('');
        expect(pipe.transform('hello')).toBe('');
    });

    it('should check date in the future', () => {
        const pipe = new AgoPipe();
        expect(pipe.transform('2031-10-04T17:50:18.000Z')).toBe('');
    });

    it('should check date exactly the same', () => {
        const pipe = new AgoPipe();
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:00:00.000Z'))).toBe('minute ago');
    });

    it('should check date is within 1 hour difference', () => {
        const pipe = new AgoPipe();
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:00:01.000Z'))).toBe('minute ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:00:59.000Z'))).toBe('minute ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:01:00.000Z'))).toBe('minute ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:01:59.000Z'))).toBe('minute ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:02:00.000Z'))).toBe('2 minutes ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:02:10.000Z'))).toBe('2 minutes ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:59:00.000Z'))).toBe('59 minutes ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T00:59:59.000Z'))).toBe('59 minutes ago');
    });

    it('should check date is within 1-24 hours difference', () => {
        const pipe = new AgoPipe();
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T01:00:00.000Z'))).toBe('1 hour ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T01:10:00.000Z'))).toBe('1 hour ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T01:59:00.000Z'))).toBe('2 hours ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T02:00:01.000Z'))).toBe('2 hours ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T23:00:00.000Z'))).toBe('23 hours ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-01T23:59:00.000Z'))).toBe('24 hours ago');
    });

    it('should check date is within more than a day difference', () => {
        const pipe = new AgoPipe();
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T00:00:00.000Z'))).toBe('1 day ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T00:00:01.000Z'))).toBe('1 day ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T01:00:00.000Z'))).toBe('1 day ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T11:00:00.000Z'))).toBe('1 day ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T12:00:00.000Z'))).toBe('2 days ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T23:00:00.000Z'))).toBe('2 days ago');
        expect(pipe.transform('2021-10-01T00:00:00.000Z', parseISO('2021-10-02T23:59:00.000Z'))).toBe('2 days ago');
    });
});
