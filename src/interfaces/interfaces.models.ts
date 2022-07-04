import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

import { measure } from '../models/recipe.model';

export interface iRecipe {
    title: string;
    origin: string;
    content: string;
    img: string;
    ingredients: Array<iFood>;
}
export interface iFood {
    ingredient: RelationField;
    amount: number;
    measure: measure;
}
export interface iIngredient {
    name: string;
    category: string;
    recipes: Array<{ recipe: RelationField }>;
}

export interface iUser {}

export interface ExtRequest extends Request {
    tokenPayload: JwtPayload; // iTokenPayload;
}

export interface iTokenPayload extends JwtPayload {
    id: string;
    name: string;
}
export interface RelationField {
    type: mongoose.Types.ObjectId;
    ref: string;
}
