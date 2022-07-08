import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

/* istanbul ignore file */
(async () => {
    await mongooseConnect();
})();

const userSchema = new mongoose.Schema({
    userName: {
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
