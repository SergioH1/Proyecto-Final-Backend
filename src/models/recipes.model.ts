import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose';

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
    ingredients: {
        type: mongoose.Types.ObjectId,
        ref: 'Ingredient',
    },
});
recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Recipe = mongoose.model('Recipe', recipeSchema);
