import { RecipesController } from './recipes.controller';
describe('Given a instantiated Controller Recipes Controller', () => {
    let req;
    let resp;
    let next = jest.fn();
    let mockModel = {
        find: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ ingredient: 'pollo' }),
            }),
        }),
        findById: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ ingredient: 'pollo' }),
            }),
        }),
    };
    let controller = new RecipesController(mockModel);
    beforeEach(() => {
        req = {
            params: { id: '62b5d4943bc55ff0124f6c1d' },
            body: [{ ingredient: 'alga' }],
            query: {
                q: 'algo',
            },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
            end: jest.fn(),
        };
        next = jest.fn();
    });
    describe('When method getAllController is called and it success', () => {
        test('Them in success resp.send should be called with the data', async () => {
            await controller.getAllController(req, resp);
            expect(resp.send).toHaveBeenCalled();
        });
    });
    describe('When method getController is called and it success', () => {
        test('Them in success resp.end should be called with the data', async () => {
            await controller.getController(req, resp, next);
            expect(resp.end).toHaveBeenCalled();
        });
        test('Them in success resp.end should be called with the data', async () => {
            mockModel.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(null),
                }),
            });
            await controller.getController(req, resp, next);
            expect(resp.status).toHaveBeenCalledWith(406);
        });
    });
    describe('When method getController is called with id invalid', () => {
        test('Them in success resp.status should be called with 404', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1' },
            };
            await controller.getController(req, resp, next);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
    describe('When method patchOnlyIngredientController is called ', () => {
        test('them in success resp.status with 202', async () => {
            mockModel.findById = jest.fn().mockResolvedValue({
                ingredients: [
                    {
                        ingredient: 'Pollo',
                    },
                ],
                save: jest.fn(),
            });
            await controller.patchOnlyIngredientController(req, resp);
            expect(resp.status).toHaveBeenCalledWith(202);
        });
    });
    describe('When metodhod patchOnlykeywordController is called', () => {
        test('them in success resp.status with 202', async () => {
            mockModel.findById = jest.fn().mockResolvedValue({
                keywords: ['pollo'],
                save: jest.fn(),
            });
            await controller.patchOnlyKeywordController(req, resp);
            expect(resp.status).toHaveBeenCalledWith(202);
        });
    });
});
