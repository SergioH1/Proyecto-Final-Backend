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
            const response = await request(app).get('/recipe/');

            expect(response.statusCode).toBe(200);
        });
        test('If i call method , them status is called', async () => {
            const response = await request(app).get('/recip/');

            expect(response.statusCode).toBe(404);
        });
    });
    describe('When method GET is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get(
                `/recipe/${data.recipes[0].id}`
            );
            expect(response.status).toBe(200);
        });
    });
    describe('When method GET is used with bad id', () => {
        test('Then status should be 404', async () => {
            let id = 121441421;
            const response = await request(app).get(`/recipe/${id}`);
            expect(response.status).toBe(404);
        });
    });
    // describe('When method PATCH is used with the required params', () => {
    //     test('Then status should be 200', async () => {
    //         const recipe = {
    //             ingredients: [],
    //         };
    //         const response = await request(app).patch(
    //             `/recipe/addIngredient/${data.ingredients[0].id}`
    //         );

    //         expect(response.statusCode).toStrictEqual(202);
    //     });
    // });
});
