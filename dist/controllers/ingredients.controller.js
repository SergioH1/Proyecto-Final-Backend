import { MongooseController } from './mongoose.controller.js';
export class IngredientController extends MongooseController {
    model;
    constructor(model) {
        super(model);
        this.model = model;
    }
    getAllController = async (req, resp) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(await this.model.find());
    };
    getController = async (req, resp, next) => {
        let result;
        try {
            resp.setHeader('Content-type', 'application/json');
            if (req.params.id.length !== 24) {
                resp.status(404);
                resp.end(JSON.stringify({}));
                throw new Error('Id not found');
            }
            result = await this.model.findById(req.params.id);
            if (!result) {
                resp.status(406);
                resp.end(JSON.stringify({}));
                throw new Error('Id not found');
            }
            else {
                resp.end(JSON.stringify(result));
            }
        }
        catch (err) {
            next(err);
        }
    };
}
