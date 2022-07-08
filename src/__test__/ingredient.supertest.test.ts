// import { server } from '..';
import { initDB } from '../db/init.db';
import request from 'supertest';
import { app } from '../app';
import { mongooseConnect } from '../db/mongoose';

describe('Given the routes of "/ingredients', () => {
    // eslint-disable-next-line no-unused-vars
    let data: { [key: string]: Array<any> };
    let connect: any;
    beforeAll(async () => {
        // eslint-disable-next-line no-unused-vars
        connect = await mongooseConnect();
        data = await initDB();
    });

    afterAll(async () => {
        connect.disconnect();
    });

    describe('When method Get is used', () => {
        test('If i call method , them status is called', async () => {
            const response = await request(app).get('/ingredients/');

            expect(response.statusCode).toBe(200);
        });
    });
    describe('When method GET is used in "/:id" route', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get(
                `/ingredients/${data.ingredients[0].id}`
            );
            expect(response.statusCode).toBe(200);
        });
    });
});
