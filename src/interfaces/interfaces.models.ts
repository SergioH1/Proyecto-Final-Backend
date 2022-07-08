import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface iRecipe {
    id?: string;
    title: string;
    origin: string;
    content: string;
    img: string;
    ingredients: Array<iFood>;
    keyword: Array<string>;
}
export interface iFood {
    ingredient: RelationField | null;
    amount: number;
    measure: string;
}
export interface iIngredient {
    id?: string;
    name: string;
    category: string;
    // recipes: Array<{ recipe: RelationField }>;
}

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
