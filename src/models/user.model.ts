import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();

const userSchema = new mongoose.Schema({
    Username: { type: mongoose.SchemaTypes.String, required: true },
    email: mongoose.SchemaTypes.String,
    passwd: { type: mongoose.SchemaTypes.String, required: true },
    recipes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Recipes',
        },
    ],
    avatar: String,
    phone: String,
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const User = mongoose.model('User', userSchema);
