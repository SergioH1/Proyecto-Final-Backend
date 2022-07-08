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
export function insertMany() {
    Ingredient.insertMany([
        { name: 'Noodles', category: 'Pasta' },
        { name: 'Salmon', category: 'Pescado' },
        { name: 'Spaghetti', category: 'Pasta' },
        { name: 'Arroz', category: 'Cereal' },
        { name: 'Nata', category: 'Pasion' },
        { name: 'Gambas', category: 'Marisco' },
        {
            name: 'Huevos',
            category: 'Proteinas',
        },
        { name: 'Bacon', category: 'Carne' },
        { name: 'Salsa de Soja', category: 'Salsa' },
        { name: 'Shitake', category: 'Setas' },
        { name: 'Jengibre', category: 'Especias' },
        { name: 'Zanahora', category: 'Hortaliza' },
        { name: 'Cebolleta', category: 'Hortaliza' },
        { name: 'Sake', category: 'Liquido' },
        { name: 'Alga Nori', category: 'Alga' },
        { name: 'Alga Kombu', category: 'Alga' },
        { name: 'Harina', category: 'Cereal' },
        { name: 'Limon', category: 'Fruta' },
        { name: 'Maicena', category: 'Cereal' },
        { name: 'Calamares', category: 'Pescado' },
        { name: 'Sepia', category: 'Pescado' },
    ])
        .then(function () {
        console.log('Data inserted'); // Success
    })
        .catch(function (error) {
        console.log(error); // Failure
    });
}
