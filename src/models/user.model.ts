import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();

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
            ref: 'Recipes',
        },
    ],
    avatar: String,
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const User = mongoose.model('User', userSchema);
