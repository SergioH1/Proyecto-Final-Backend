import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

export enum measure {
    'g' = 'g',
    'ml' = 'ml',
    'unit' = 'unit',
}
async () => {
    await mongooseConnect();
};
const recipeSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    origin: String,
    content: String,
    img: String,
    ingredients: [
        {
            ingredient: {
                type: mongoose.Types.ObjectId,
                ref: 'Ingredient',
            },
            amount: Number,
            measure: String,
        },
    ],
});
recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Recipe = mongoose.model('Recipe', recipeSchema);
