import { sanitizeString } from "./sanitize-str";

describe('sanitizeString unit test', () => {
    it('should string empty when value is falsey', () => {
        //@ts-expect-error forçando entrada inválida
        const result = sanitizeString();
        expect(result).toBe('');
    });
    it('should string empty when value is not a string', () => {
        //@ts-expect-error forçando entrada inválida
        const result = sanitizeString(123);
        expect(result).toBe('');
    });
    it('should return a atring without spaces in the beginning and the end', () => {
        const result = sanitizeString('   Hello, world!   ');
        expect(result).toBe('Hello, world!');
    });
   it('should return a string normalized with NFC', () => {
        const original = 'e\u0301';//e com acento
        const expected = 'é';   
        const result = sanitizeString(original);
        expect(expected).toBe(result);       
    });
});