/* eslint-disable no-unused-vars */

import { initDB } from '../db/init.db';
import request from 'supertest';
import { app } from '../app';
import { mongooseConnect } from '../db/mongoose';
import * as aut from '../services/authorization';
import { iUser } from '../controllers/user.controller';

describe('Given the routes of "/ingredients', () => {
    let data: { [key: string]: Array<any> };
    let connect: any;
    let token: string;
    beforeAll(async () => {
        connect = await mongooseConnect();
        data = await initDB();

        token = aut.createToken({
            id: data.users[0].id,
            userName: data.users[0].name,
        });
    });

    afterAll(async () => {
        connect.disconnect();
    });

    describe('When method Get is used', () => {
        test('If i call method , them statuscode is called with 404', async () => {
            const response = await request(app).get('/user/');

            expect(response.statusCode).toBe(404);
        });
    });
    describe('When method patch is used ', () => {
        test('If i am loged Them status should be 401', async () => {
            const changes = {};
            const response = await request(app)
                .patch(`/user/${data.users[1].id}`)
                .set('Authorization', 'Bearer ' + token)
                .send(changes);
            expect(response.statusCode).toBe(401);
        });
    });
    test('If i am not loged Them status should be a 202', async () => {
        const changes = {
            avatar: 'asfas',
        };
        const response = await request(app)
            .patch(`/user/${data.users[0].id}`)

            .send(changes);
        expect(response.statusCode).toBe(401);
    });
    test('If i am loged Them status should be a 202', async () => {
        const user = {
            avatar: 'afhauufhahsf',
        };
        const response = await request(app)
            .patch(`/user/${data.users[0].id}`)
            .set('Authorization', 'Bearer ' + token)
            .send(user);
        expect(response.statusCode).toBe(200);
    });
    describe('When method GET is used in "/:id" route', () => {
        test(' then status should be 200', async () => {
            const response = await request(app).get(
                `/user/${data.users[0].id}`
            );
            expect(response.statusCode).toBe(200);
        });
        test(' If is invalid id , then status should be 404', async () => {
            const response = await request(app).get(`/user/2284445`);
            expect(response.statusCode).toBe(422);
        });
    });
    describe('When method Post is Used ', () => {
        test('them status should be 200', async () => {
            const newUser: Partial<iUser> = {
                userName: 'troll',
                passwd: '123',
                email: 'serga21@gaasfgsa.com',
            };
            const response = await request(app).post(`/user/`).send(newUser);
            expect(response.status).toBe(201);
        });
        test('them status should be 403', async () => {
            const newUser: Partial<iUser> = {
                userName: 'Sergio',
                passwd: '123',
                email: 'serga21@gaasfgsa.com',
            };
            const response = await request(app).post(`/user/`).send(newUser);
            expect(response.status).toBe(500);
        });
    });
    describe('When method delete is used', () => {
        test('If i am loged Them status should be a 202', async () => {
            const response = await request(app)
                .delete(`/user/${data.users[0].id}`)
                .set('Authorization', 'Bearer ' + token);
            expect(response.statusCode).toBe(202);
        });
        test('If i am not loged Them status should be a 202', async () => {
            const response = await request(app).delete(
                `/user/${data.users[0].id}`
            );

            expect(response.statusCode).toBe(401);
        });
    });
    describe('When method login is used ', () => {
        test('if userName is "" returnd error 404', async () => {
            const response = await request(app).post(`/user/login}`);

            expect(response.statusCode).toBe(404);
        });
        test('if userName and passwd is ', async () => {
            const user: Partial<iUser> = {
                userName: 'troll',
                passwd: '123',
            };
            const response = await request(app).post(`/user/login`).send(user);

            expect(response.statusCode).toBe(201);
        });
    });
});
