import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

import { RelationField } from '../interfaces/interfaces.models.js';
/* istanbul ignore file */
(async () => {
    await mongooseConnect();
})();
export interface iUser {
    Username: string;
    email: string;
    passwd: string;
    recipes: Array<RelationField> | null;
    avatar: string;
}
const userSchema = new mongoose.Schema({
    Username: {
        type: mongoose.SchemaTypes.String,
        required: true,

        unique: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    passwd: { type: mongoose.SchemaTypes.String, required: true },
    recipes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Recipe',
        },
    ],
    avatar: String,
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});

export const User = mongoose.model('User', userSchema);
