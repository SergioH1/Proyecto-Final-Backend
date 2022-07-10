import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
/* istanbul ignore file */
(async () => {
    await mongooseConnect();
})();

const ingredientSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    category: mongoose.SchemaTypes.String,
});
ingredientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export function insertManyIngredient() {
    Ingredient.insertMany([{ name: 'cerveza', category: 'Bebida' }])
        .then(function () {
            console.log('Data inserted'); // Success
        })
        .catch(function (error) {
            console.log(error); // Failure
        });
}
