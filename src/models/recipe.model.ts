import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
/* istanbul ignore file */
export enum measure {
    'g' = 'g',
    'ml' = 'ml',
    'unit' = 'unit',
}

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
            title: 'Pollo al horno con cerveza',
            origin: 'Spain',
            content:
                'Pelamos y cortamos las patatas en rodajas no muy finas. De en torno a 1/2 dedo de grosor.' +
                'Pelamos también la cebolla y la cortamos en juliana es decir, en tiras finas' +
                'En una bandeja de horno ponemos como base la patata para nuestro pollo a la cerveza al horno. Que cubra el fondo por completo. Encima colocamos la cebolla de tal manera que también quede bien distribuida por toda la patata. Salpimentamos ambos ingredientes' +
                'Sobre esta base de cebolla y patata, ponemos los muslos de pollo boca abajo. Es decir, con la parte «más fea» para arriba. Después les daremos la vuelta y así, ya quedarán directamente bien presentados' +
                'Regamos el pollo con una lata de cerveza -recuerda que puedes utilizar la que más te guste. Cuanto más fuerte sea, más amargor dará- Salpimentamos y añadimos un poco de romero seco y de tomillo seco. Finalmente regamos con un poco de aceite de oliva' +
                'ntroducimos nuestro pollo a la cerveza en el horno previamente calentado a 200ºC, calor arriba y abajo. Dejamos que se cocine aquí en torno a unos 25 minutos. Hasta que coja color' +
                'Pasado el tiempo, sacamos la bandeja del horno. Volvemos a salpimentar la otra cara y a echar un poco de romero y tomillo secos. Introducimos al horno de nuevo, otros 25 minutos, hasta que los muslos del pollo estén bien cocinados y la patata, blandita',
            img: 'https://cdn.mytaste.org/i?u=group2%2FM00%2FE8%2FD3%2FCgAINlxkMq2AFefjAAoyKj8EIGg449.jpg',
            ingredients: [
                {
                    ingredient: '62c3ec220f971e4942ce0f48',
                    amount: 4,
                    measure: 'muslos',
                },
                {
                    ingredient: '62c831aba903bfcdbb1c7198',
                    amount: 1,
                    measure: 'lata',
                },
            ],
            keywords: ['Cerveza'],
        },
    ])
        .then(function () {
            console.log('Data inserted'); // Success
        })
        .catch(function (error) {
            console.log(error); // Failure
        });
}
