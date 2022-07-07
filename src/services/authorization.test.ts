import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { compare, createToken, encrypt, verifyToken } from './authorization';
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
describe('When the function encrypt is called', () => {
    test('Them it should return a string encripted ', async () => {
        let source = '315511';
        let sourceCryp = 'aofuuoaojfoasafs';
        bcrypt.hash = jest.fn().mockResolvedValue(sourceCryp);
        let result = await encrypt(source);
        expect(result).toBe(sourceCryp);
    });
    test('Them it should return a undefined ', async () => {
        let source = '';
        bcrypt.hash = jest.fn();
        await encrypt(source);

        expect(bcrypt.hash).toBeCalledTimes(0);
    });
});
describe('When the function compare is called', () => {
    test('them it should return a Bolean', async () => {
        let value = '2';
        let hash = '3';
        bcrypt.compare = jest.fn().mockResolvedValue(false);
        expect(await compare(value, hash)).toBe(false);
    });
});

describe('When the function createToken is called', () => {
    test('them it should jwt.sing is called', async () => {
        jwt.sign = jest.fn();
        await createToken({ id: 'r', name: '3' });
        expect(jwt.sign).toBeCalled();
    });
});
describe('When the function verifyToken is called', () => {
    test('them it should jwt.verify is called', async () => {
        jwt.verify = jest.fn();
        await verifyToken('sfas');
        expect(jwt.verify).toBeCalled();
    });
});
