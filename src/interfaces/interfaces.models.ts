export interface iRecipe {
    title: string;
    origin: string;
    content: string;
    img: string;
    ingredientes: [];
}
export interface iIngredient {}

export interface iUser {}
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ExtRequest extends Request {
    tokenPayload: JwtPayload; // iTokenPayload;
}

export interface iTokenPayload extends JwtPayload {
    id: string;
    name: string;
}
