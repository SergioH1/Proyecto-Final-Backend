// import { NextFunction, Request, Response } from 'express';
// import { Model } from 'mongoose';
// import { MongooseController } from './mongoose.controller';

// export class RecipesController<T> extends MongooseController<T> {
//     constructor(public model: Model<T>) {
//         super(model);
//     }

//     getAllController = async (req:Request, resp:Response)=>{
//         req;
//         resp.setHeader("Content-type","application/json");
//         resp.send(
//             await this.model.find().populate("ingredient",{

//             })
//         )
//     }
// }
