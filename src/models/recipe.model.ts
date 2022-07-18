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
            title: 'Pasta carbonara de verdad',
            origin: 'Italian',
            content: '' + '' + '' + '' + '',
            ingredients: [
                {
                    ingredient: '62c441490433eebce469bd9f',
                    amount: 170,
                    measure: 'g',
                },
                {
                    ingredient: '62c441490433eebce469bdac',
                    amount: 4,
                    measure: 'unit',
                },
                {
                    ingredient: '62c441490433eebce469bda1',
                    amount: 150,
                    measure: 'g',
                },
            ],
            keywords: ['Huevos', 'Bacon', 'Pasta', 'Parmesano'],
            img: 'https://imag.bonviveur.com/salsa-carbonara.jpg',
        },
        {
            title: 'Pasta al pesto',
            origin: 'Italian',
            content: '' + '' + '' + '' + '',
            ingredients: [
                {
                    ingredient: '62c441490433eebce469bd9f',
                    amount: 170,
                    measure: 'g',
                },
                {
                    ingredient: '62c441490433eebce469bdac',
                    amount: 4,
                    measure: 'unit',
                },
                {
                    ingredient: '62c441490433eebce469bda1',
                    amount: 150,
                    measure: 'g',
                },
            ],
            keywords: ['Pasta', 'Albahaca', 'Ajo', 'Frutos secos'],
            img: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/2400/public/media/image/2021/11/pasta-pesto-2526561.jpg?itok=OJdi0sEl',
        },
        {
            title: 'Pizza Pepperoni',
            origin: 'Italian',
            content: '' + '' + '' + '' + '',
            ingredients: [
                {
                    ingredient: '62c441490433eebce469bd9f',
                    amount: 170,
                    measure: 'g',
                },
                {
                    ingredient: '62c441490433eebce469bdac',
                    amount: 4,
                    measure: 'unit',
                },
                {
                    ingredient: '62c441490433eebce469bda1',
                    amount: 150,
                    measure: 'g',
                },
            ],
            keywords: ['Queso', 'Chorizo', 'Harina', 'Tomate'],
            img: 'https://i.pinimg.com/originals/a1/35/64/a135643a361418235c8df04b79740745.jpg',
        },

        {
            title: 'Rissoto con setas ',
            origin: 'Italian',
            content: '' + '' + '' + '' + '',
            ingredients: [
                {
                    ingredient: '62c441490433eebce469bd9f',
                    amount: 170,
                    measure: 'g',
                },
                {
                    ingredient: '62c441490433eebce469bdac',
                    amount: 4,
                    measure: 'unit',
                },
                {
                    ingredient: '62c441490433eebce469bda1',
                    amount: 150,
                    measure: 'g',
                },
            ],
            keywords: ['Arroz', 'Alga Nori', 'Salmon'],
            img: 'https://unareceta.com/wp-content/uploads/2016/10/risotto-de-setas-sin-nata.jpg',
        },
    ])
        .then(function () {
            console.log('Data inserted'); // Success
        })
        .catch(function (error) {
            console.log(error); // Failure
        });
}
