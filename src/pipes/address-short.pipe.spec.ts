import { AddressShortPipe } from './address-short.pipe';

fdescribe('AddressShortPipe', () => {
    it('create an instance', () => {
        const pipe = new AddressShortPipe();
        expect(pipe).toBeTruthy();
    });

    it('should check simple values', () => {
        const pipe = new AddressShortPipe();
        expect(pipe.transform('')).toBe('');
        expect(pipe.transform('123')).toBe('123');
        expect(pipe.transform('acdfacdf')).toBe('acdfacdf');
        expect(pipe.transform('acdfacdfg')).toBe('acdfacdfg');
    });

    it('should correct values', () => {
        const pipe = new AddressShortPipe();
        expect(pipe.transform('AbcdefghijklmnoprstuwxyZ')).toBe('Abcd...wxyZ');
        expect(pipe.transform('1234567890')).toBe('1234...7890');
    });
});
