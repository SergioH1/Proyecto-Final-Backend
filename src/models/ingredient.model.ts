import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();

const ingredientSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    category: mongoose.SchemaTypes.String,
    // recipes: [
    //     {
    //         recipe: {
    //             type: mongoose.Types.ObjectId,
    //             ref: 'Recipe',
    //         },
    //     },
    // ],
});
ingredientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Ingredient = mongoose.model('Ingredient', ingredientSchema);
