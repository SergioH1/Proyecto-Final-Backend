import { iUser } from '../controllers/user.controller';
import { iIngredient, iRecipe } from '../interfaces/interfaces.models';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';
import { encrypt } from '../services/authorization';
// import { mongooseConnect } from './mongoose';
// import { mongooseConnect } from './mongoose';

let aUsers: Array<iUser> = [
    {
        Username: 'Sergio',
        email: 'sergioh@gmail.com',
        passwd: '1254',
        avatar: 'String',
        recipes: [],
    },
    {
        Username: 'Ango',
        email: 'anguitoh@gmail.com',
        passwd: '1254',
        avatar: 'String',
        recipes: [],
    },
];

const aIngredients: Array<iIngredient> = [
    {
        name: 'pollo',
        category: 'carne',
    },
    {
        name: 'salmon',
        category: 'salmon',
    },
];

const aRecipes: Array<iRecipe> = [
    {
        title: 'Pollo seco',
        origin: 'global',
        content: 'Sarten al fuego, lo hechas 3 min y listo',
        img: 'sin foto ',
        keyword: ['pollo'],
        ingredients: [],
    },
    {
        title: 'Salmon',
        origin: 'global',
        content: 'Sarten al fuego, lo hechas 3 min y listo',
        img: 'sin foto ',
        keyword: ['Salmon'],
        ingredients: [],
    },
];

console.log({ aRecipes });
export const initDB = async () => {
    User.collection.drop();
    Recipe.collection.drop();
    Ingredient.collection.drop();
    User.deleteMany({});
    Recipe.deleteMany({});
    Ingredient.deleteMany({});

    (aUsers as any) = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            passwd: await encrypt(item.passwd),
        }))
    );

    const ingredients = await Ingredient.insertMany(aIngredients);

    aRecipes[0].ingredients.push({
        ingredient: ingredients[0].id,
        measure: 'unit',
        amount: 3,
    });

    aRecipes[1].ingredients.push({
        ingredient: ingredients[1].id,
        measure: 'unit',
        amount: 3,
    });
    const recipes = await Recipe.insertMany(aRecipes);
    (aUsers as any) = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            recipes: [recipes[0].id],
            passwd: await encrypt(item.passwd),
        }))
    );
    const users = await User.insertMany(aUsers);

    return {
        ingredients,
        users,
        recipes,
    };
};
