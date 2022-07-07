import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
export var measure;
(function (measure) {
    measure["g"] = "g";
    measure["ml"] = "ml";
    measure["unit"] = "unit";
})(measure || (measure = {}));
(async () => {
    await mongooseConnect();
})();
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
        mongoose.SchemaTypes.String,
    ],
    keywords: [mongoose.SchemaTypes.String],
});
recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Recipe = mongoose.model('Recipe', recipeSchema);
export function insertManyRecipe() {
    Recipe.insertMany([
        {
            title: 'Pollo Seco',
            origin: 'Global',
            content: 'En un tazón , mezcla el ajo picado, la salsa de soja, las escamas de chille, el aceite de oliva y la miel. Coloca las pechugas en un bol o en una bolsa, vierte el adobo sobre el pollo cubriéndolo bien y si utilizas la bolsa muévelo hasta que se impregne bien. Deja marinar en el frigorífico al menos 1 hora o incluso toda la noche' +
                'Coloca una sartén al fuego con un poquito de aceite. Dora las pechugas a fuego alto 2 min por cada lado.' +
                'Baja el fuego a suave, tapa la sartén y cocina otros 10 min. Acuérdate de reducir los tiempos si tus pechugas son más pequeñas.' +
                'Aparta del fuego y deja reposar tapado otros 7 min' +
                'Retira la tapa, deja enfriar 5 min para no quemarte y ya puedes partirlo en láminas o en tiras a modo de carne mechada. Guárdalo en un recipiente hermético en la nevera. ',
            img: 'https://www.recetasconpollo.org/wp-content/uploads/2019/12/filete-pechuga-pollo-plancha--512x341.jpg',
            ingredients: [
                {
                    ingredient: '62c3ec220f971e4942ce0f48',
                    amount: 3,
                    measure: 'pechugas',
                },
            ],
            keywords: ['Pollo'],
        },
    ])
        .then(function () {
        console.log('Data inserted'); // Success
    })
        .catch(function (error) {
        console.log(error); // Failure
    });
}
