import { IngredientController } from './ingredients.controller';
describe('Givena a Instantiated Controller IngredientsController', () => {
    let req;
    let resp;
    let next = jest.fn();
    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
    };
    let controller = new IngredientController(mockModel);
    beforeEach(() => {
        req = {
            params: { id: '62b5d4943bc55ff0124f6c1d' },
            body: [{ ingredient: 'alga' }],
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
            end: jest.fn(),
        };
        next = jest.fn();
    });
    describe('When method geAllController is called and it success', () => {
        test('Them is success resp.send should be called with the data', async () => {
            await controller.getAllController(req, resp);
            expect(resp.send).toHaveBeenCalled();
        });
    });
    describe('When method getController is called and it success', () => {
        test('Them is success resp.end should be called with the data', async () => {
            const mockResult = { test: 'test' };
            mockModel.findById.mockResolvedValue(mockResult);
            await controller.getController(req, resp, next);
            expect(resp.end).toHaveBeenCalled();
        });
        test('Them is success resp.send should be called with the data', async () => {
            const mockResult = null;
            mockModel.findById.mockResolvedValue(mockResult);
            await controller.getController(req, resp, next);
            expect(resp.end).toHaveBeenCalled();
        });
    });
    describe('When method getController is called and it failed', () => {
        test('Them next function is called', async () => {
            await controller.getController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
