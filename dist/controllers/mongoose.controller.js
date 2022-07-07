export class MongooseController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAllController = async (req, resp) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(await this.model.find()));
    };
    getController = async (req, resp, next) => {
        try {
            resp.setHeader('Content-type', 'application/json');
            if (req.params.id.length !== 24) {
                resp.status(404);
                resp.end(JSON.stringify({}));
                throw new Error('Id not found');
            }
            const result = await this.model.findById(req.params.id);
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
    postController = async (req, resp, next) => {
        try {
            const newItem = await this.model.create(req.body);
            if (!newItem)
                throw new Error('error');
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newItem));
        }
        catch (error) {
            next(error);
        }
    };
    patchController = async (req, resp) => {
        const newItem = await this.model.findByIdAndUpdate(req.params.id, req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(newItem));
        resp.status(202);
    };
    deleteController = async (req, resp, next) => {
        try {
            if (req.params.id.length !== 24) {
                resp.status(404);
                resp.end(JSON.stringify({}));
                throw new Error('Id invalid');
            }
            const deleteItem = await this.model.findByIdAndDelete(req.params.id);
            if (!deleteItem) {
                resp.status(406);
                resp.end(JSON.stringify({}));
                throw new Error('Id not found');
            }
            else {
                resp.end(JSON.stringify(deleteItem));
                resp.status(200);
            }
        }
        catch (err) {
            next(err);
        }
    };
}
