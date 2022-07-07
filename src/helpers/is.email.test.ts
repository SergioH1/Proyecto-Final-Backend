import { isEmail } from './is.email';

describe('Given the function is email is called ', () => {
    test('Them returned a email valid', () => {
        let email = 'sergio.afahfa@gmail.com';

        expect(isEmail(email)).toBe(true);
    });
});
