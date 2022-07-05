import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

export enum measure {
    'g' = 'g',
    'ml' = 'ml',
    'unit' = 'unit',
}

await mongooseConnect();

const recipeSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    origin: mongoose.SchemaTypes.String,
    content: mongoose.SchemaTypes.String,
    img: mongoose.SchemaTypes.String,
    ingredients: [
        {
            ingredient: {
                type: mongoose.Types.ObjectId,
                ref: 'Ingredient',
            },
            amount: mongoose.SchemaTypes.Number,
            measure: mongoose.SchemaTypes.String,
        },
    ],
});
recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Recipe = mongoose.model('Recipe', recipeSchema);
